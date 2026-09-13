import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  SHOW_ADVANCED_STORAGE_KEY,
  filterAdvancedItems,
  useShowAdvanced,
} from "./product-policy";

describe("product-policy", () => {
  beforeEach(() => {
    window.localStorage.removeItem(SHOW_ADVANCED_STORAGE_KEY);
  });

  it("staat standaard uit (false)", () => {
    const { result } = renderHook(() => useShowAdvanced());
    expect(result.current.showAdvanced).toBe(false);
  });

  it("persisteert wijzigen naar localStorage", () => {
    const { result } = renderHook(() => useShowAdvanced());
    act(() => {
      result.current.setShowAdvanced(true);
    });
    expect(result.current.showAdvanced).toBe(true);
    expect(window.localStorage.getItem(SHOW_ADVANCED_STORAGE_KEY)).toBe("true");
  });

  it("leest een eerder bewaarde waarde", () => {
    window.localStorage.setItem(SHOW_ADVANCED_STORAGE_KEY, "true");
    const { result } = renderHook(() => useShowAdvanced());
    expect(result.current.showAdvanced).toBe(true);
  });

  it("synchroniseert via storage-event (ander tabblad)", () => {
    const { result } = renderHook(() => useShowAdvanced());
    expect(result.current.showAdvanced).toBe(false);
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: SHOW_ADVANCED_STORAGE_KEY,
          newValue: "true",
        }),
      );
    });
    expect(result.current.showAdvanced).toBe(true);
  });

  it("filtert advanced-items eruit tenzij Gevorderd aanstaat", () => {
    const items = [{ id: "a" }, { id: "b", advanced: true }, { id: "c", advanced: false }];
    expect(filterAdvancedItems(items, false).map((i) => i.id)).toEqual(["a", "c"]);
    expect(filterAdvancedItems(items, true).map((i) => i.id)).toEqual(["a", "b", "c"]);
  });
});
