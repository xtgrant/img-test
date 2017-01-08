import { ImgTestPage } from './app.po';

describe('img-test App', function() {
  let page: ImgTestPage;

  beforeEach(() => {
    page = new ImgTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
