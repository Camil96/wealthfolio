import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useActivitySearch } from "@/pages/activity/hooks/use-activity-search";
import { RecentTransactions } from "./recent-transactions";

vi.mock("@/pages/activity/hooks/use-activity-search", () => ({
  useActivitySearch: vi.fn(),
}));

const mockUseActivitySearch = vi.mocked(useActivitySearch);

function activity(overrides = {}) {
  return {
    id: "a1",
    activityType: "BUY",
    date: new Date("2026-08-01T00:00:00Z"),
    quantity: "10",
    unitPrice: "100",
    amount: "-1000",
    fee: null,
    currency: "EUR",
    createdAt: new Date("2026-08-01T00:00:00Z"),
    assetId: "asset-1",
    updatedAt: new Date("2026-08-01T00:00:00Z"),
    accountId: "acc-1",
    accountName: "Betaalrekening",
    accountCurrency: "EUR",
    assetSymbol: "VWCE",
    assetName: "Vanguard FTSE All-World",
    ...overrides,
  };
}

describe("RecentTransactions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("toont de laatste transacties met datum, omschrijving en bedrag", () => {
    mockUseActivitySearch.mockReturnValue({
      mode: "paginated",
      data: [activity()],
      totalRowCount: 1,
      pageCount: 1,
      isFetching: false,
      isLoading: false,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useActivitySearch>);

    render(
      <MemoryRouter>
        <RecentTransactions />
      </MemoryRouter>,
    );

    expect(screen.getByText("Vanguard FTSE All-World")).toBeInTheDocument();
    expect(screen.getByText(/01-08-2026/)).toBeInTheDocument();
    expect(screen.getByText(/Betaalrekening/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /alles bekijken/i })).toHaveAttribute(
      "href",
      "/activities",
    );
  });

  it("toont een lege staat zonder transacties", () => {
    mockUseActivitySearch.mockReturnValue({
      mode: "paginated",
      data: [],
      totalRowCount: 0,
      pageCount: 0,
      isFetching: false,
      isLoading: false,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useActivitySearch>);

    render(
      <MemoryRouter>
        <RecentTransactions />
      </MemoryRouter>,
    );

    expect(screen.getByText(/nog geen transacties/i)).toBeInTheDocument();
  });
});
