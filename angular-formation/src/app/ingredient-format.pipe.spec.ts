import { IngredientFormatPipe } from './ingredient-format.pipe';

describe('IngredientFormatPipe', () => {
  let pipe: IngredientFormatPipe;

  beforeEach(() => {
    pipe = new IngredientFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the input string to include parentheses', () => {
    const input = 'example';
    const expectedOutput = ' - (example)';
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });
});
