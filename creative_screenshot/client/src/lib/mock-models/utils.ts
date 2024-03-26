/*
 Copyright 2024 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * Generate a random number from x (being a large int) to x * 10
 */
export const mockRandomId = (): number => {
  const bigInt = 1000000000000000;
  return randomInt(bigInt, bigInt * 10);
};

/**
 * Returns a number between min and max (including)
 * @param minumum the lowest possible number
 * @param maximum the highest possible number
 * @returns a number netween the bounds
 */
export const randomInt = (minumum: number, maximum: number): number => {
  return Math.floor(Math.random() * (maximum - minumum + 1) + maximum);
};

/**
 * Helper function to generate an array with items
 * @param size the number of array items to generate
 * @param filler the function return of this will be each array's item
 * @returns an array filled with nthh (size) items of return type filler
 */
export const mockArray = <T>(
  size: number,
  filler: (index: number) => T
): Array<T> => {
  return new Array(size).fill(undefined).map((_, index) => filler(index));
};

/**
 * Get a placeholder image url
 * @returns a url to an image
 */
export const mockImage = (): string => 'https://placehold.co/600x400';
