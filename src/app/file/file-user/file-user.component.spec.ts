import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUserComponent } from './file-user.component';

describe('FileUserComponent', () => {
  let component: FileUserComponent;
  let fixture: ComponentFixture<FileUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
