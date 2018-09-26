before(function(){
    cy.visit('https://collaborative-learning.concord.org/branch/master/?appMode=demo&demoClass=5&demoUser=student:1&demoOffering=4&problem=1.1');

        cy.get('.left-nav > .tabs > .tab').each(($tab, index, $list)=>{
            let title = $tab.text();
            cy.wrap($tab).click();
            cy.get('.left-nav-panel > .section > .canvas > .document-content > .buttons > button').should('contain', title).click();
        })

});

describe('Test My Work tabs', function(){
    it('will verify that opened content is listed in My Work tab space', function(){ //still need to verify the titles match the titles from opened canvases
        cy.get('.right-nav > .tabs > .tab').each(($tab, index, $list)=>{
            cy.log('Tab is' + $tab.text());
            cy.wrap($tab).click();
            cy.get('.expanded-area.expanded > .contents > .my-work > .list > .list-item').each(($item,index,$list)=>{
                cy.log('Title is ' + $item.text());
            })
        });
    });
    it('will open the correct canvas selected from the My Work list', function(){
            cy.get('.expanded-area.expanded > .contents > .my-work > .list > .list-item').each(($item,index,$list)=>{
                let title= $item.text().replace(/[^\x00-\x7F]/g, "");
                cy.wrap($item).click();
                cy.get('.single-workspace > .workspace > .titlebar > .title')
                    .then(($canvasTitle)=>{
                        let canvasTitle=$canvasTitle.text();
                        expect($canvasTitle.text()).to.contain(title);
                });
                cy.get('.right-nav > .tabs > .tab').click();
            })

    });

});
