import { NgplayerPage } from './app.po';

describe('ngplayer App', function() {
  let page: NgplayerPage;

  beforeEach(() => {
    page = new NgplayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
