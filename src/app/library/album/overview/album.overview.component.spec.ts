import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";
import {AlbumOverviewComponent} from "./album.overview.component";
import {MaterialModule} from "@angular/material";
import {LibraryService} from "../../service/library.service";
import {Observable} from "rxjs";
import {SimpleAlbum} from "../../model/simple.album";
import {SimpleArtist} from "../../model/simple.artist";
import {By} from "@angular/platform-browser";

describe('AlbumOverviewComponent', () => {

  const ARTIST_1 = new SimpleArtist("kings of leon");
  const ARTIST_2 = new SimpleArtist("muse");

  const ALBUM_1 = new SimpleAlbum("uri album 1", ARTIST_1, "album 1");
  const ALBUM_2 = new SimpleAlbum("uri album 2", ARTIST_2, "album 2");

  let component: AlbumOverviewComponent;
  let fixture: ComponentFixture<AlbumOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumOverviewComponent],
      imports: [MaterialModule],
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

      let albumElements = fixture.debugElement.queryAll(By.css('a'));
      expect(albumElements.length).toEqual(2);
      assertAlbumEntry(albumElements[0], "album 1 - kings of leon");
      assertAlbumEntry(albumElements[1], "album 2 - muse");
      expect(TestBed.get(LibraryService).getAlbums).toHaveBeenCalled();
    }));

    function assertAlbumEntry(albumEntry, expectedTextContent) {
      expect(albumEntry.attributes['routerLink']).toEqual("/albumDetail/");
      expect(albumEntry.children[0].nativeElement.innerText).toEqual(expectedTextContent);
    };
  });
});
