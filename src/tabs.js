export default class Tabs {
    constructor(elementId) {
        this.tabs = document.getElementById(elementId);
        this.nav = this.tabs.querySelector('.tabs');

        this.nav.addEventListener('click', (e) => {
            // Checking if the element where we clicked have the tabs__button class
            if([...e.target.classList].includes('tabs__button')) {
                // Obtaining the tab that we want to show
                const tab = e.target.dataset.tab;

                // Removing the active class from the other tabs
                if(this.tabs.querySelector('.tab--active')){
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }

                // Removing the active class from the other buttons
                if(this.tabs.querySelector('.tabs__button--active')){
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }
                
                // Add the active class to the tab
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

                // Add the active class to the button
                e.target.classList.add('tabs__button--active');
            }
        })
    }
}