import { Button } from "@wealthfolio/ui/components/ui/button";
import { Icons } from "@wealthfolio/ui/components/ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/**
 * Camilfolio snelle acties onder de dashboard-grafiek: de twee dingen die een
 * leek het vaakst doet — een transactie vastleggen en een doel aanmaken.
 */
export function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild>
        <Link to="/activities/manage">
          <Icons.Plus className="h-4 w-4" />
          {t("dashboard:add_transaction")}
        </Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link to="/goals/new">
          <Icons.Goal className="h-4 w-4" />
          {t("dashboard:create_goal")}
        </Link>
      </Button>
    </div>
  );
}

export default QuickActions;
