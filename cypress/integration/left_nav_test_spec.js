before(function(){
    cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=demo&demoClass=5&demoUser=student:1&demoOffering=4&problem=1.1');
});

describe('Test Left tabs',function(){
 it('will verify correct tab opens to correct content', function(){
     cy.get('.left-nav > .tabs > .tab').each(($tab,index, $list) => {
             cy.log('Tab is' + $tab.text());
             var title = $tab.text();//get the tab label
             cy.wrap($tab).click();//click on tab (check to see if this is the first time the tab is clicked, because the second click to the tab will close the expanded area
             cy.get('.expanded-area > .left-nav-panel > .section >.section-header > h1').should('contain', title)//verify that expanded area is showing
             //verify that the expanded area title corresponds to the tab label
             //repeat for every tab.
     })

 });
 it('will verify the transfer of the tab info to the canvas', function(){

 });


});