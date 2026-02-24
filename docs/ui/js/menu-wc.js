'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@zgames/ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ZgBadgeComponent.html" data-type="entity-link" >ZgBadgeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgBreadcrumbComponent.html" data-type="entity-link" >ZgBreadcrumbComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgButtonComponent.html" data-type="entity-link" >ZgButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoCatalogHeaderComponent.html" data-type="entity-link" >ZgCasinoCatalogHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoGameCardComponent.html" data-type="entity-link" >ZgCasinoGameCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoGamesCarouselSectionComponent.html" data-type="entity-link" >ZgCasinoGamesCarouselSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoGamesGridSectionComponent.html" data-type="entity-link" >ZgCasinoGamesGridSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoGamesGridTemplateComponent.html" data-type="entity-link" >ZgCasinoGamesGridTemplateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoHomeHeroComponent.html" data-type="entity-link" >ZgCasinoHomeHeroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoHomeTemplateComponent.html" data-type="entity-link" >ZgCasinoHomeTemplateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoProviderCarouselComponent.html" data-type="entity-link" >ZgCasinoProviderCarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoProviderParallaxShowcaseComponent.html" data-type="entity-link" >ZgCasinoProviderParallaxShowcaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoRankedGamesCarouselSectionComponent.html" data-type="entity-link" >ZgCasinoRankedGamesCarouselSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoSearchBarComponent.html" data-type="entity-link" >ZgCasinoSearchBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCasinoTwoRowGamesCarouselSectionComponent.html" data-type="entity-link" >ZgCasinoTwoRowGamesCarouselSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgCategoryFilterTabsComponent.html" data-type="entity-link" >ZgCategoryFilterTabsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgChipComponent.html" data-type="entity-link" >ZgChipComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgContentSectionHeaderComponent.html" data-type="entity-link" >ZgContentSectionHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgHorizontalListLayoutComponent.html" data-type="entity-link" >ZgHorizontalListLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgInputComponent.html" data-type="entity-link" >ZgInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgLuckyPickerComponent.html" data-type="entity-link" >ZgLuckyPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgSectionActionsComponent.html" data-type="entity-link" >ZgSectionActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgSectionTitleComponent.html" data-type="entity-link" >ZgSectionTitleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ZgSiteHeaderComponent.html" data-type="entity-link" >ZgSiteHeaderComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BreadcrumbItem.html" data-type="entity-link" >BreadcrumbItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CasinoGamesCarouselSectionItem.html" data-type="entity-link" >CasinoGamesCarouselSectionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CasinoProviderCarouselItem.html" data-type="entity-link" >CasinoProviderCarouselItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CasinoRankedGamesCarouselItem.html" data-type="entity-link" >CasinoRankedGamesCarouselItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CasinoTwoRowGamesCarouselSectionItem.html" data-type="entity-link" >CasinoTwoRowGamesCarouselSectionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryFilterTabItem.html" data-type="entity-link" >CategoryFilterTabItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DemoChipItem.html" data-type="entity-link" >DemoChipItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HorizontalListScrollState.html" data-type="entity-link" >HorizontalListScrollState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SiteHeaderNavItem.html" data-type="entity-link" >SiteHeaderNavItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TwoRowColumn.html" data-type="entity-link" >TwoRowColumn</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});