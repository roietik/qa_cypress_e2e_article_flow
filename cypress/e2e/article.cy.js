describe('', () => {
  const title = 'Testowy tytuł artykułu';
  const description = 'To jest testowy opis artykułu.';
  const body = 'To jest treść testowego artykułu. Możemy użyć markdown.';

  const articleTitlePlaceholder = 'Article Title';
  const articleDescriptionPlaceholder = 'What\'s this article about?';
  const articleBodyPlaceholder = 'Write your article (in markdown)';

  beforeEach(() => {
    cy.visit('/user/login');
    cy.get('input[type=email]').type('radoslaw.grzymala@hotmail.com');
    cy.get('input[type=password]').type('Radko!23');
    cy.get('button[type=submit]').click();
  });

  const createArticle = () => {
    cy.get('a.nav-link[href="/editor"]').click();
    cy.location('pathname').should('eq', '/editor');

    cy.get(`input[placeholder="${articleTitlePlaceholder}"]`).type(title);
    cy.get(`input[placeholder="${articleDescriptionPlaceholder}"]`).type(description);
    cy.get(`textarea[placeholder="${articleBodyPlaceholder}"]`).type(body);
    cy.get('button.btn-primary').click();

    cy.get('h1').should('contain', title);
    cy.get('.article-content').should('contain', body);
    cy.url().should('include', '/article/');
  };

  it('Should create article', () => {
    createArticle();
  });

  it('Should delete article', () => {
    createArticle();

    cy.url().should('include', '/article/');
    cy.get('button.btn-outline-danger:first').click();
    cy.location('pathname').should('eq', '/');
    cy.get('.article-preview').should('not.contain', title);
  });
});
