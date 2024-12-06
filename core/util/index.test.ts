// File generated by Continue
import {
  dedent,
  dedentAndGetCommonWhitespace,
  deduplicateArray,
  getLastNPathParts,
} from "./";

describe("getLastNPathParts", () => {
  test("returns the last N parts of a filepath with forward slashes", () => {
    const filepath = "home/user/documents/project/file.txt";
    expect(getLastNPathParts(filepath, 2)).toBe("project/file.txt");
  });

  test("returns the last N parts of a filepath with backward slashes", () => {
    const filepath = "C:\\home\\user\\documents\\project\\file.txt";
    expect(getLastNPathParts(filepath, 3)).toBe("documents/project/file.txt");
  });

  test("returns the last part if N is 1", () => {
    const filepath = "/home/user/documents/project/file.txt";
    expect(getLastNPathParts(filepath, 1)).toBe("file.txt");
  });

  test("returns the entire path if N is greater than the number of parts", () => {
    const filepath = "home/user/documents/project/file.txt";
    expect(getLastNPathParts(filepath, 10)).toBe(
      "home/user/documents/project/file.txt",
    );
  });

  test("returns an empty string if N is 0", () => {
    const filepath = "home/user/documents/project/file.txt";
    expect(getLastNPathParts(filepath, 0)).toBe("");
  });

  test("handles paths with mixed forward and backward slashes", () => {
    const filepath = "home\\user/documents\\project/file.txt";
    expect(getLastNPathParts(filepath, 3)).toBe("documents/project/file.txt");
  });

  test("handles edge case with empty filepath", () => {
    const filepath = "";
    expect(getLastNPathParts(filepath, 2)).toBe("");
  });
});

describe("deduplicateArray", () => {
  it("should return an empty array when given an empty array", () => {
    const result = deduplicateArray([], (a, b) => a === b);
    expect(result).toEqual([]);
  });

  it("should return the same array when there are no duplicates", () => {
    const input = [1, 2, 3, 4, 5];
    const result = deduplicateArray(input, (a, b) => a === b);
    expect(result).toEqual(input);
  });

  it("should remove duplicates based on the equality function", () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const result = deduplicateArray(input, (a, b) => a === b);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should work with objects using custom equality function", () => {
    const input = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice" },
      { id: 3, name: "Charlie" },
    ];
    const result = deduplicateArray(input, (a, b) => a.id === b.id);
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("should preserve the order of items", () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const result = deduplicateArray(input, (a, b) => a === b);
    expect(result).toEqual([3, 1, 4, 5, 9, 2, 6]);
  });

  it("should work with strings", () => {
    const input = ["apple", "banana", "apple", "cherry", "banana", "date"];
    const result = deduplicateArray(input, (a, b) => a === b);
    expect(result).toEqual(["apple", "banana", "cherry", "date"]);
  });

  it("should handle arrays with all duplicate elements", () => {
    const input = [1, 1, 1, 1, 1];
    const result = deduplicateArray(input, (a, b) => a === b);
    expect(result).toEqual([1]);
  });

  it("should work with custom equality function for complex objects", () => {
    const input = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const result = deduplicateArray(
      input,
      (a, b) => a.x === b.x && a.y === b.y,
    );
    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 4 },
    ]);
  });

  it("should handle large arrays efficiently", () => {
    const input = Array(10000)
      .fill(0)
      .map((_, i) => i % 100);
    const start = performance.now();
    const result = deduplicateArray(input, (a, b) => a === b);
    const end = performance.now();
    expect(result).toHaveLength(100);
    expect(end - start).toBeLessThan(1000); // Ensure it completes in less than 1 second
  });
});

describe("dedentAndGetCommonWhitespace", () => {
  let originalString: string;

  beforeEach(() => {
    // Setup any global variables or states if needed
    originalString = "    line1\n    line2\n    line3";
  });

  afterEach(() => {
    // Tear down any changes to global variables or states if needed
    originalString = "";
  });

  test("should dedent and return common whitespace for a simple case", () => {
    const input = "    line1\n    line2\n    line3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["line1\nline2\nline3", "    "]);
  });

  test("should handle empty string", () => {
    const input = "";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["", ""]);
  });

  test("should handle string with only whitespace", () => {
    const input = "    ";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["", ""]);
  });

  test("should handle string with mixed whitespace and content", () => {
    const input = "    line1\n  line2\n    line3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["  line1\nline2\n  line3", "  "]);
  });

  test("should handle string with no common leading whitespace", () => {
    const input = "line1\n  line2\n    line3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual([input, ""]);
  });

  test("should handle string with empty lines", () => {
    const input = "    line1\n\n    line3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["line1\n\nline3", "    "]);
  });

  test("should handle string with only empty lines", () => {
    const input = "\n\n";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["\n\n", ""]);
  });

  test("should handle string with tabs as whitespace", () => {
    const input = "\tline1\n\tline2\n\tline3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["line1\nline2\nline3", "\t"]);
  });

  test("should handle string with mixed tabs and spaces", () => {
    const input = "\t    line1\n\t    line2\n\t    line3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["line1\nline2\nline3", "\t    "]);
  });

  test("should handle string with different leading whitespace lengths", () => {
    const input = "    line1\n  line2\n      line3";
    const output = dedentAndGetCommonWhitespace(input);
    expect(output).toEqual(["  line1\nline2\n    line3", "  "]);
  });
});

describe("dedent function", () => {
  it("should remove common leading whitespace from all lines", () => {
    const result = dedent`
      Hello
        World
          !
    `;
    expect(result).toBe("Hello\n  World\n    !");
  });

  it("should handle strings with no indentation", () => {
    const result = dedent`Hello
World
!`;
    expect(result).toBe("Hello\nWorld\n!");
  });

  it("should handle strings with mixed indentation", () => {
    const result = dedent`
      Hello
    World
        !
    `;
    expect(result).toBe("  Hello\nWorld\n    !");
  });

  it("should remove leading and trailing empty lines", () => {
    const result = dedent`

      Hello
      World

    `;
    expect(result).toBe("Hello\nWorld");
  });

  it("should handle empty strings", () => {
    const result = dedent``;
    expect(result).toBe("");
  });

  it("should handle strings with only whitespace", () => {
    const result = dedent`
    
    `;
    expect(result).toBe("");
  });

  it.skip("should handle strings with tabs", () => {
    const result = dedent`
      \tHello
      \t\tWorld
      \t\t\t!
`;
    expect(result).toBe("\tHello\n\t\tWorld\n\t\t\t!");
  });

  it("should handle interpolated values", () => {
    const world = "World";
    const result = dedent`
      Hello ${world}
        How are you?
    `;
    expect(result).toBe("Hello World\n  How are you?");
  });

  it("should handle multiple interpolated values", () => {
    const greeting = "Hello";
    const name = "Alice";
    const question = "How are you?";
    const result = dedent`
      ${greeting} ${name}
        ${question}
    `;
    expect(result).toBe("Hello Alice\n  How are you?");
  });

  it("should handle interpolated values with different indentation", () => {
    const value1 = "foo";
    const value2 = "bar";
    const result = dedent`
      ${value1}
        ${value2}
    `;
    expect(result).toBe("foo\n  bar");
  });

  it("should handle a single line with indentation", () => {
    const result = dedent`    Hello World!`;
    expect(result).toBe("Hello World!");
  });

  it("should handle a string with only one non-empty line", () => {
    const result = dedent`
      
      Hello World!
      
    `;
    expect(result).toBe("Hello World!");
  });

  it("should handle a string with Unicode characters", () => {
    const result = dedent`
      こんにちは
        世界
    `;
    expect(result).toBe("こんにちは\n  世界");
  });

  it("should handle a string with emoji", () => {
    const result = dedent`
      🌍
        🌎
          🌏
    `;
    expect(result).toBe("🌍\n  🌎\n    🌏");
  });

  it.skip("should handle a string with CRLF line endings", () => {
    const result = dedent`
      Hello\r
        World\r
    `;
    expect(result).toBe("Hello\r\n  World");
  });

  it("should not count empty lines in the minimum indentation", () => {
    const result = dedent`
      Hello

      World
    `;

    expect(result).toBe("Hello\n\nWorld");
  });

  it("should work with templated strings", () => {
    const language = "typescript";
    const code = "console.log('hello');\nconsole.log('world');";

    const result = dedent`
        This is the prefix of the file:
        \`\`\`${language}
        ${code}
        \`\`\``;

    expect(result).toBe(`\
This is the prefix of the file:
\`\`\`${language}
${code}
\`\`\``);
  });
});
