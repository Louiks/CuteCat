import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from "rxjs";
import { Cat } from "../models/cat.model";
import { CatFactsTO } from "../models/cat-facts.model";
import { CatNamesTO } from "../models/cat-names.model";
import { CatPicturesTO } from "../models/cat-pictures.model";
import { NotificationService } from "../../app/core/services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class CatDataService {
    private readonly RANDOM_CAT_FACTS_URL: string = 'https://meowfacts.herokuapp.com';
    private readonly RANDOM_CAT_PICTURE_URL: string = 'https://api.thecatapi.com/v1/images/search';
    private readonly RANDOM_CAT_NAME_URL: string = 'https://tools.estevecastells.com/api/cats/v1';
    private readonly INITIAL_NUMBER_OF_CATS_TO_LOAD: number = 10;

    private catFacts: Set<string> = new Set<string>();
    private catPictures: Set<string> = new Set<string>();
    private catNames: Set<string> = new Set<string>();
    private loadedCatsSubject: BehaviorSubject<Cat[]> = new BehaviorSubject<Cat[]>([]);
    loadedCats$: Observable<Cat[]> = this.loadedCatsSubject.asObservable();
    private isCatRetrievalEnabled: boolean = true;

    constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
        this.loadMoreCats(this.INITIAL_NUMBER_OF_CATS_TO_LOAD);
    }

    loadMoreCats(numberOfCatsToLoad: number): void {
        if (!this.isCatRetrievalEnabled) {
            return;
        }

        combineLatest([
            this.loadCatFacts(numberOfCatsToLoad, [], 3),
            this.loadCatNames(numberOfCatsToLoad, [], 3),
            this.loadCatPictures(numberOfCatsToLoad, [], 3)])
            .subscribe({
                next: ([facts, names, pictures]) => {
                    facts.forEach((fact: string) => this.catFacts.add(fact));
                    names.forEach((name: string) => this.catNames.add(name));
                    pictures.forEach((picture: string) => this.catPictures.add(picture));
                    const newCats: Cat[] = [];
                    for (let i = 0; i < facts.length; i++) {
                        const newCat: Cat = {
                            name: names[i],
                            description: facts[i],
                            imageUrl: pictures[i],
                            isFavorite: false,
                            likes: 0
                        }
                        newCats.push(newCat);
                    }
                    this.loadedCatsSubject.next([...this.loadedCatsSubject.value, ...newCats]);
                },
                error: () => {
                    this.disableCatRetrieval();
                    this.emitOldValue();
                    this.notificationService.showNotification("Cats can no longer be loaded; reason: retrieving too many duplicates.");
                }
            });
    }

    favoritesChanged(cat: Cat): void {
        cat.isFavorite = !cat.isFavorite;
        cat.isFavorite
            ? cat.likes++
            : cat.likes--;
        this.loadedCatsSubject.next(this.loadedCatsSubject.value);
    }

    private emitOldValue(): void {
        this.loadedCatsSubject.next([...this.loadedCatsSubject.value]);
    }

    private loadCatFacts(targetNumberOfCats: number, currentCatArray: string[], retriesLeft: number): Observable<string[]> {
        return this.httpClient.get<CatFactsTO>(this.RANDOM_CAT_FACTS_URL + `?count=${targetNumberOfCats}`)
            .pipe(
                map(((response: CatFactsTO) => response.data.filter((url) => !this.catFacts.has(url) && !currentCatArray.includes(url)))),
                tap((urls) => currentCatArray.push(...urls)),
                switchMap(() => {
                    if (currentCatArray.length < targetNumberOfCats && retriesLeft > 0) {
                        return this.loadCatFacts(targetNumberOfCats - currentCatArray.length, currentCatArray, retriesLeft - 1);
                    }
                    if (currentCatArray.length < targetNumberOfCats && retriesLeft === 0) {
                        throw new Error('Failed to load target number of cat facts after multiple retries, - probable reason: receiving duplicates');
                    }
                    return [currentCatArray];
                })
            );
    }

    private loadCatNames(targetNumberOfCats: number, currentCatArray: string[], retriesLeft: number): Observable<string[]> {
        return this.httpClient.get<CatNamesTO>(this.RANDOM_CAT_NAME_URL + `?limit=${targetNumberOfCats}`)
            .pipe(
                map(((response: CatNamesTO) => response.filter((url) => !this.catNames.has(url) && !currentCatArray.includes(url)))),
                tap((urls) => currentCatArray.push(...urls)),
                switchMap(() => {
                    if (currentCatArray.length < targetNumberOfCats && retriesLeft > 0) {
                        return this.loadCatNames(targetNumberOfCats - currentCatArray.length, currentCatArray, retriesLeft - 1);
                    }
                    if (currentCatArray.length < targetNumberOfCats && retriesLeft === 0) {
                        throw new Error('Failed to load target number of cat names after multiple retries, - probable reason: receiving duplicates');
                    }
                    return [currentCatArray];
                })
            );
    }

    private loadCatPictures(targetNumberOfCats: number, currentCatArray: string[], retriesLeft: number): Observable<string[]> {
        return this.httpClient.get<CatPicturesTO>(this.RANDOM_CAT_PICTURE_URL + `?limit=${targetNumberOfCats}`)
            .pipe(
                map(((response: CatPicturesTO) => response.map((catPicture) => catPicture.url))),
                map(((response) => response.filter((url) => !this.catPictures.has(url) && !currentCatArray.includes(url)))),
                tap((urls) => currentCatArray.push(...urls)),
                switchMap(() => {
                    if (currentCatArray.length < targetNumberOfCats && retriesLeft > 0) {
                        return this.loadCatPictures(targetNumberOfCats - currentCatArray.length, currentCatArray, retriesLeft - 1);
                    }
                    if (currentCatArray.length < targetNumberOfCats && retriesLeft === 0) {
                        throw new Error('Failed to load target number of cat pictures after multiple retries, - probable reason: receiving duplicates');
                    }
                    return [currentCatArray];
                })
            );
    }

    private disableCatRetrieval(): void {
        this.isCatRetrievalEnabled = false;
    }
}