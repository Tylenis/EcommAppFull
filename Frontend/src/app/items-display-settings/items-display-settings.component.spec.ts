import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDisplaySettingsComponent } from './items-display-settings.component';

describe('ItemsDisplaySettingsComponent', () => {
    let component: ItemsDisplaySettingsComponent;
    let fixture: ComponentFixture<ItemsDisplaySettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemsDisplaySettingsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsDisplaySettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
