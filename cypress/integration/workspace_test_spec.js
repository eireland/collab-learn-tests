import Workspace from './elements/Workspace.js';
import LeftNav from './elements/LeftNav';
import BottomNav from './elements/BottomNav';
import RightNav from './elements/RightNav';
import Canvas from './elements/Canvas';
import LearningLog from './elements/LearningLog';

const baseUrl = `${Cypress.config("baseUrl")}`;
const queryParam = `${Cypress.config("queryParams")}`
let leftNav = new LeftNav,
    bottomNav = new BottomNav,
    rightNav = new RightNav,
    canvas = new Canvas,
    learningLog = new LearningLog;


context('Test the overall workspace', function(){

    describe('Desktop functionalities', function(){
        it('will verify that clicking on tab closes the nav area', function(){
            leftNav.openLeftNavTab('Introduction'); //left nav expand area should be visible
            leftNav.getLeftNavExpandedSpace().should('be.visible');
            leftNav.closeLeftNavTab('Introduction'); //left nav expand area should not be visible
            leftNav.getLeftNavExpandedSpace().should('not.be.visible');

            rightNav.openMyWorkTab(); //my work expand area should be visible
            rightNav.getRightNavExpandedSpace().should('be.visible');
            rightNav.closeMyWorkTab(); //my work expand area should not be visible
            rightNav.getRightNavExpandedSpace().should('not.be.visible');

            learningLog.openLearningLogTab(); //learning log expand area should be visible
            bottomNav.getBottomNavExpandedSpace().should('be.visible');
            learningLog.closeLearningLogTab(); //learning log expand area should not be visible
            bottomNav.getBottomNavExpandedSpace().should('not.be.visible');
        });

        it('will verify that left nav area is closes when other tabs are opened', function(){ //should this be tab closes when no longer in that area? my work and left nav
            // cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=qa&fakeClass=5&fakeUser=student:1&fakeOffering=1&qaGroup=1&problem=1.1');
            cy.visit(baseUrl+queryParam);
            leftNav.openLeftNavTab('Introduction'); //left nav expand area should be visible
            leftNav.getLeftNavExpandedSpace().should('be.visible');
            rightNav.getRightNavExpandedSpace().should('not.be.visible');
            bottomNav.getBottomNavExpandedSpace().should('not.be.visible');

            rightNav.openMyWorkTab(); //my work expand area should be visible
            leftNav.getLeftNavExpandedSpace().should('not.be.visible');
            rightNav.getRightNavExpandedSpace().should('be.visible');
            bottomNav.getBottomNavExpandedSpace().should('not.be.visible');

            learningLog.openLearningLogTab(); //learning log expand area should be visible
            rightNav.getRightNavExpandedSpace().should('be.visible');
            bottomNav.getBottomNavExpandedSpace().should('be.visible');
            leftNav.getLeftNavExpandedSpace().should('not.be.visible');
            //close all tabs to clear workspace for next test
            learningLog.closeLearningLogTab(); //learning log expand area should be visible
            rightNav.closeMyWorkTab(); //my work expand area should be visible
        });

        it('will verify that right nav tabs are still visible and clickable when Learning Log is expanded', function(){
            learningLog.openLearningLogTab(); //learning log expand area should be visible
            bottomNav.getBottomNavExpandedSpace().should('be.visible');
            rightNav.getRightNavTabs().each(($tab,index, $list) => {
                cy.wrap($tab).click();//click on tab (check to see if this is the first time the tab is clicked, because the second click to the tab will close the expanded area
                rightNav.getRightNavExpandedSpace().should('be.visible');
            })
        });

        it('will verify canvases do not persist between problems', function(){
            let problem1='1.1',
                problem2='2.1';
            let tab1 ='Introduction';

            // cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=qa&fakeClass=4&fakeUser=student:3&fakeOffering=1&qaGroup=1&problem='+problem1);
            cy.visit(baseUrl+'?appMode=qa&fakeClass=5&fakeUser=student:1&fakeOffering=1&qaGroup=1&problem='+problem1);
            cy.wait(1000);

            leftNav.openLeftNavTab(tab1);
            leftNav.openToWorkspace();
            canvas.getCanvasTitle()
                .then(($titleLoc)=>{
                let title = $titleLoc.text().replace(/[^\x00-\x7F]/g, "");
                expect(title).to.contain(tab1);
            });
            canvas.addTextTile();
            canvas.enterText('This is the '+tab1+ ' in Problem '+problem1);
            canvas.getTextTile().last().should('contain', 'Problem '+problem1);
            cy.wait(2000);

            // cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=qa&fakeClass=4&fakeUser=student:3&fakeOffering=2&qaGroup=1&problem='+problem2);
            cy.visit(baseUrl+'?appMode=qa&fakeClass=5&fakeUser=student:1&fakeOffering=1&qaGroup=1&problem='+problem2);
            cy.wait(1000);
            leftNav.openLeftNavTab(tab1);
            leftNav.openToWorkspace();
            canvas.getCanvasTitle().should('contain',tab1);
            canvas.getTextTile().should('not.exist');
            cy.wait(2000);

            //Shows student as disconnected and will not load the introduction canvas
            // cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=qa&fakeClass=4&fakeUser=student:3&fakeOffering=1&qaGroup=1&problem='+problem1);
            cy.visit(baseUrl+'?appMode=qa&fakeClass=5&fakeUser=student:1&fakeOffering=1&qaGroup=1&problem='+problem1);
            cy.wait(1000);
            leftNav.openLeftNavTab(tab1);
            leftNav.openToWorkspace();
            cy.wait(1000);
            canvas.getCanvasTitle().should('contain',tab1);
            canvas.getTextTile().last().should('contain', 'Problem '+problem1);
            canvas.deleteTile('text')//clean up
        })

    });
});