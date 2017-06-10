import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";
import {AlbumOverviewComponent} from "./album.overview.component";
import {MaterialModule} from "@angular/material";
import {LibraryService} from "../../service/library.service";
import {Observable} from "rxjs";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {AlbumBuilder} from "../../../../testing/model_test_util";

describe('AlbumOverviewComponent', () => {

  const ALBUM_1_TITLE = "album 1 title";
  const ALBUM_1_ARTIST = "album 1 artist";

  const ALBUM_2_TITLE = "album 2 title";
  const ALBUM_2_ARTIST = "album 2 artist";

  const ALBUM_1 = new AlbumBuilder().withTitle(ALBUM_1_TITLE).withArtist(ALBUM_1_ARTIST).build();
  const ALBUM_2 = new AlbumBuilder().withTitle(ALBUM_2_TITLE).withArtist(ALBUM_2_ARTIST).build();

  let component: AlbumOverviewComponent;
  let fixture: ComponentFixture<AlbumOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumOverviewComponent],
      imports: [RouterTestingModule, CommonModule, MaterialModule],
      providers: [{provide: LibraryService, useValue: jasmine.createSpyObj('LibraryService', ['getAlbums'])}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumOverviewComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('retrieves and initialises the list of albums', fakeAsync(() => {
      TestBed.get(LibraryService).getAlbums.and.returnValue(Observable.of([ALBUM_1, ALBUM_2]));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let albumElements = fixture.debugElement.queryAll(By.css('h3'));
      expect(albumElements.length).toEqual(2);
      expect(albumElements[0].nativeElement.innerText).toEqual(ALBUM_1_TITLE + " - " + ALBUM_1_ARTIST);
      expect(albumElements[1].nativeElement.innerText).toEqual(ALBUM_2_TITLE + " - " + ALBUM_2_ARTIST);

      let albumLinks = fixture.debugElement.queryAll(By.css('a'));
      expect(albumLinks[0].attributes['routerLink']).toEqual("/albumDetail/");
      expect(albumLinks[1].attributes['routerLink']).toEqual("/albumDetail/");
    }));
  });
});
