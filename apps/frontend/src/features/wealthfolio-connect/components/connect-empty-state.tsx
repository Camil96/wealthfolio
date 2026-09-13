import { Button } from "@wealthfolio/ui/components/ui/button";
import { Icons } from "@wealthfolio/ui/components/ui/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConnectFlowDiagram } from "./connect-flow-diagram";

const colorClasses = {
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    icon: "text-orange-600 dark:text-orange-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    icon: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    icon: "text-green-600 dark:text-green-400",
  },
};

export function ConnectEmptyState() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Icons.CloudSync2,
      title: t("connect:emptyState.features.brokerageSync.title"),
      description: t("connect:emptyState.features.brokerageSync.description"),
      color: "orange",
    },
    {
      icon: Icons.Devices,
      title: t("connect:emptyState.features.deviceSync.title"),
      description: t("connect:emptyState.features.deviceSync.description"),
      color: "green",
    },
    {
      icon: Icons.UserSwitch,
      title: t("connect:emptyState.features.householdView.title"),
      description: t("connect:emptyState.features.householdView.description"),
      color: "blue",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-3xl space-y-8 sm:space-y-12">
        {/* Header with Logo */}
        <header className="text-center">
          <img alt="Wealthfolio" className="mx-auto mb-4 h-16 w-16" src="/logo-vantage.png" />
          <div className="bg-secondary text-secondary-foreground mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium">
            <Icons.Sparkles className="h-3 w-3" />
            {t("connect:emptyState.optional")}
          </div>
          <h1 className="mb-2 text-xl font-semibold tracking-tight">Wealthfolio Connect</h1>
          <p className="text-muted-foreground text-sm">{t("connect:emptyState.subtitle")}</p>
          {/* Camilfolio: neutrale status, geen vendor-belofte */}
          <p className="text-muted-foreground mt-3 text-sm font-medium">
            {t("connect:emptyState.syncNeutralTitle")}:{" "}
            {t("connect:emptyState.syncNeutralDescription")}
          </p>
        </header>

        {/* Hero Diagram - constrained width */}
        <section className="mx-auto max-w-2xl">
          <ConnectFlowDiagram />
        </section>

        {/* Features - responsive grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {features.map((feature) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <div key={feature.title} className="flex items-center gap-3">
                <div className={`shrink-0 rounded-xl p-2.5 ${colors.bg}`}>
                  <feature.icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA — Camilfolio: geen portal-marketing, alleen login voor testaccounts */}
        <footer className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/settings/connect">
                <Icons.User className="mr-1.5 h-4 w-4" />
                {t("connect:emptyState.loginToAccount")}
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
