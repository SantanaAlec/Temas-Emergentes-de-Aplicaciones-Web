function removeDuplicates(array) {
    // Create a new Set from the array to remove duplicates
    const uniqueArray = Array.from(new Set(array));
    
    return uniqueArray;
}

// Example usage
const array = [1, 2, 3, 4, 4, 5, 6, 6];
const result = removeDuplicates(array);
console.log(result); // Output: [1, 2, 3, 4, 5, 6]
