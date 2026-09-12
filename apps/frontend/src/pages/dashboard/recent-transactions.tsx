import { DashboardCard } from "@/components/dashboard-card";
import { useActivitySearch } from "@/pages/activity/hooks/use-activity-search";
import { Skeleton } from "@wealthfolio/ui/components/ui/skeleton";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/**
 * Camilfolio-widget: de 5 laatste transacties (datum, omschrijving, bedrag).
 * Alleen-lezen overzicht; bewerken gebeurt op de Transacties-pagina.
 */
export function RecentTransactions() {
  const { t } = useTranslation();
  const { data, isLoading } = useActivitySearch({
    mode: "paginated",
    pageIndex: 0,
    filters: { activityTypes: [] },
    searchQuery: "",
    sorting: [{ id: "date", desc: true }],
    pageSize: 5,
  });

  if (isLoading) {
    return (
      <DashboardCard title={t("dashboard:recent_transactions")} elevated>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </DashboardCard>
    );
  }

  if (data.length === 0) {
    return (
      <DashboardCard title={t("dashboard:recent_transactions")} elevated>
        <p className="text-muted-foreground py-2 text-center text-sm">
          {t("dashboard:no_recent_transactions")}
        </p>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title={t("dashboard:recent_transactions")}
      elevated
      action={
        <Link
          to="/activities"
          className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
        >
          {t("dashboard:view_all")}
        </Link>
      }
    >
      <ul className="divide-border/40 divide-y">
        {data.map((activity) => {
          const label = activity.assetName ?? activity.assetSymbol ?? activity.comment ?? "—";
          const amount = activity.amount != null ? Number(activity.amount) : null;
          return (
            <li key={activity.id} className="flex items-center justify-between gap-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{label}</p>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(activity.date), "dd-MM-yyyy")} · {activity.accountName}
                </p>
              </div>
              <p
                className={`shrink-0 text-sm font-semibold tabular-nums ${
                  amount != null && amount < 0 ? "text-destructive" : "text-success"
                }`}
              >
                {amount != null
                  ? `${amount < 0 ? "−" : "+"}${Math.abs(amount).toFixed(2)} ${activity.currency}`
                  : "—"}
              </p>
            </li>
          );
        })}
      </ul>
    </DashboardCard>
  );
}

export default RecentTransactions;
