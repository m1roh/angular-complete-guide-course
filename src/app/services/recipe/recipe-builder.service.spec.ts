import { TestBed } from '@angular/core/testing';

import { RecipeBuilderService } from './recipe-builder.service';

describe('RecipeBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeBuilderService = TestBed.get(RecipeBuilderService);
    expect(service).toBeTruthy();
  });
});
