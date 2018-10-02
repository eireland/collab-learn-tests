context('Test image functionalities', function(){
    before(function(){
        cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=qa&fakeClass=5&fakeUser=student:1&fakeOffering=4&problem=3.3&qaGroup=1;')
    });

    describe('Test transfer of image from left-nav to canvas', function() {
        // it('verify cannot drag image when no canvas is present', function(){
        //     cy.get('#leftNavTab0').click();
        //     cy.get('.left-nav.expanded > div.expanded-area.expanded > .left-nav-panel > .section > .canvas > .document-content > .tool-tile > .image-tool > img').trigger('mousedown').trigger('mousemove',{pageX: 660 }, {pageY: 475}).trigger('mouseup',{force:true});
        // });

        it('verify image can be dragged on to canvas', function(){
            cy.get('#leftNavTab0').click();
            cy.get('.left-nav-panel > .section > .canvas > .document-content > .buttons > button').click();
            cy.get('.workspace > .titlebar > .title').should('contain','Introduction');
            cy.get('#leftNavTab0').click();
            cy.get('.left-nav.expanded > div.expanded-area.expanded > .left-nav-panel > .section > .canvas > .document-content > .tool-tile > .image-tool > img').trigger('mousedown').trigger('mousemove',{pageX: 660 }, {pageY: 475}).trigger('mouseup',{force:true});
            cy.get('#leftNavTab0').click(); //close tab
        });
        it('verify image can be dragged on to different titled canvas', function(){
            cy.get('#leftNavTab1').click();
            cy.get('.left-nav-panel > .section > .canvas > .document-content > .buttons > button').click();
            cy.get('.workspace > .titlebar > .title').should('contain','Initial');
            cy.get('#leftNavTab0').click();
            cy.get('.left-nav.expanded > div.expanded-area.expanded > .left-nav-panel > .section > .canvas > .document-content > .tool-tile > .image-tool > img').trigger('mousedown').trigger('mousemove',{pageX: 660 }, {pageY: 475}).trigger('mouseup',{force:true});
            cy.get('#leftNavTab0').click(); //close tab
        });
    });
});