import { usePersistentState } from "@/hooks/use-persistent-state";

/**
 * Camilfolio product-policy: één centrale plek voor de "Gevorderd"-ervaring.
 *
 * - `camilfolio.showAdvanced` in localStorage, default `false`.
 * - Alleen dit apparaat (geen backend, geen sync) — zie instellingentekst.
 * - Gebruik `useShowAdvanced()` in componenten en `filterAdvancedItems()` voor
 *   navigatie-/instellingenlijsten. Niets wordt verwijderd of geblokkeerd:
 *   alles blijft via deep-routes bereikbaar.
 */
export const SHOW_ADVANCED_STORAGE_KEY = "camilfolio.showAdvanced";

export interface AdvancedVisibility {
  /** True = gevorderde onderdelen tonen. Default false. */
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
}

export function useShowAdvanced(): AdvancedVisibility {
  const [showAdvanced, setShowAdvanced] = usePersistentState<boolean>(
    SHOW_ADVANCED_STORAGE_KEY,
    false,
  );
  return { showAdvanced: showAdvanced ?? false, setShowAdvanced };
}

export interface GatedItem {
  /** Alleen tonen als Gevorderd aanstaat. */
  advanced?: boolean;
}

/**
 * Filtert items met `advanced: true` eruit tenzij Gevorderd aanstaat.
 * Pure functie zodat navigatie- en instellingenlijsten dezelfde regel delen.
 */
export function filterAdvancedItems<T extends GatedItem>(
  items: readonly T[],
  showAdvanced: boolean,
): T[] {
  if (showAdvanced) {
    return [...items];
  }
  return items.filter((item) => !item.advanced);
}
