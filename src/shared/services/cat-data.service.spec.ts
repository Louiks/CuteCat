import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { CatDataService } from './cat-data.service';
import { NotificationService } from '../../app/core/services/notification.service';
import { CatFactsTO } from '../models/cat-facts.model';
import { CatNamesTO } from '../models/cat-names.model';
import { CatPicturesTO } from '../models/cat-pictures.model';
import { provideHttpClient } from "@angular/common/http";
import { Cat } from "../models/cat.model";

describe('CatDataService', () => {

    let service: CatDataService;
    let httpMock: HttpTestingController;
    let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

    const initialMockFacts: CatFactsTO = { data: ["Fact 01", "Fact 02", "Fact 03", "Fact 04", "Fact 05", "Fact 06", "Fact 07", "Fact 08", "Fact 09", "Fact 010"] };
    const initialMockNames: CatNamesTO = ["Name 01", "Name 02", "Name 03", "Name 04", "Name 05", "Name 06", "Name 07", "Name 08", "Name 09", "Name 010"];
    const initialMockPictures: CatPicturesTO = [
        {
            "url": "Picture 01",
            "id": "1",
            "width": 800,
            "height": 600
        },
        {
            "url": "Picture 02",
            "id": "2",
            "width": 1024,
            "height": 768
        },
        {
            "url": "Picture 03",
            "id": "3",
            "width": 640,
            "height": 480
        },
        {
            "url": "Picture 04",
            "id": "4",
            "width": 1920,
            "height": 1080
        },
        {
            "url": "Picture 05",
            "id": "5",
            "width": 1280,
            "height": 720
        },
        {
            "url": "Picture 06",
            "id": "6",
            "width": 2560,
            "height": 1440
        },
        {
            "url": "Picture 07",
            "id": "7",
            "width": 3840,
            "height": 2160
        },
        {
            "url": "Picture 08",
            "id": "8",
            "width": 500,
            "height": 500
        },
        {
            "url": "Picture 09",
            "id": "9",
            "width": 300,
            "height": 300
        },
        {
            "url": "Picture 010",
            "id": "10",
            "width": 1600,
            "height": 900
        }
    ];

    beforeEach(() => {
        const spy = jasmine.createSpyObj('NotificationService', ['showNotification']);

        TestBed.configureTestingModule({
            providers: [
                CatDataService,
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: NotificationService, useValue: spy }
            ]
        });

        service = TestBed.inject(CatDataService);
        httpMock = TestBed.inject(HttpTestingController);
        notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

        const reqFacts: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_FACTS_URL']}?count=10`);
        const reqNames: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_NAME_URL']}?limit=10`);
        const reqPictures: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_PICTURE_URL']}?limit=10`);

        reqFacts.flush(initialMockFacts);
        reqNames.flush(initialMockNames);
        reqPictures.flush(initialMockPictures);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        // given when then
        expect(service).toBeTruthy();
    });

    it('should load one additional cat', () => {
        // given
        const additionalFact: CatFactsTO = { data: ["fact_should load more cats 1"] };
        const additionalName: CatNamesTO = ["name_should load more cats 1"];
        const additionalPicture: CatPicturesTO = [
            {
                "url": "picture_should load more cats 1",
                "id": "1",
                "width": 800,
                "height": 600
            },
        ];

        // when
        service.loadMoreCats(1);

        const reqFacts: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_FACTS_URL']}?count=1`);
        const reqNames: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_NAME_URL']}?limit=1`);
        const reqPictures: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_PICTURE_URL']}?limit=1`);

        reqFacts.flush(additionalFact);
        reqNames.flush(additionalName);
        reqPictures.flush(additionalPicture);

        // then
        service.loadedCats$.subscribe(cats => {
            expect(cats.length).toBe(11);
            expect(cats[10].name).toBe(additionalName[0]);
            expect(cats[10].description).toBe(additionalFact.data[0]);
            expect(cats[10].imageUrl).toBe(additionalPicture[0].url);
        });
    });

    it('should handle error when loading more cats', () => {
        // given

        // when
        service.loadMoreCats(2);

        const reqFacts: TestRequest = httpMock.expectOne(`${service['RANDOM_CAT_FACTS_URL']}?count=2`);
        httpMock.expectOne(`${service['RANDOM_CAT_NAME_URL']}?limit=2`);
        httpMock.expectOne(`${service['RANDOM_CAT_PICTURE_URL']}?limit=2`);
        reqFacts.flush(null, { status: 500, statusText: 'Server Error' });

        // then
        expect(service['isCatRetrievalEnabled']).toBeFalse();
        expect(notificationServiceSpy.showNotification).toHaveBeenCalledWith('Cats can no longer be loaded; reason: retrieving too many duplicates.');
    });

    it('should toggle favorite status and update likes', () => {
        // given
        const cat: Cat = {
            name: 'Test Cat',
            description: 'Test Description',
            imageUrl: 'Test Image',
            isFavorite: false,
            likes: 0
        };
        service['loadedCatsSubject'].next([cat]);

        // when
        service.favoritesChanged(cat);

        // then
        expect(cat.isFavorite).toBeTrue();
        expect(cat.likes).toBe(1);

        // when
        service.favoritesChanged(cat);

        // then
        expect(cat.isFavorite).toBeFalse();
        expect(cat.likes).toBe(0);
    });
});