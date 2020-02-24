import React, { ReactElement } from 'react';

import EquisoftAnalyzeMobile from '../../logos/analyze/analyze-reverse-mobile.svg';
import EquisoftAnalyze from '../../logos/analyze/analyze-reverse.svg';
import EquisoftApplyMobile from '../../logos/apply/apply-reverse-mobile.svg';
import EquisoftApply from '../../logos/apply/apply-reverse.svg';
import EquisoftCentralizeMobile from '../../logos/centralize/centralize-reverse-mobile.svg';
import EquisoftCentralize from '../../logos/centralize/centralize-reverse.svg';
import EquisoftConnectMobile from '../../logos/connect/connect-reverse-mobile.svg';
import EquisoftConnect from '../../logos/connect/connect-reverse.svg';
import EquisoftDesignMobile from '../../logos/design/design-reverse-mobile.svg';
import EquisoftDesign from '../../logos/design/design-reverse.svg';
import EquisoftIllustrateMobile from '../../logos/illustrate/illustrate-reverse-mobile.svg';
import EquisoftIllustrate from '../../logos/illustrate/illustrate-reverse.svg';
import EquisoftDefault from '../../logos/logo-equisoft-reversed.svg';
import EquisoftManageMobile from '../../logos/manage/manage-reverse-mobile.svg';
import EquisoftManage from '../../logos/manage/manage-reverse.svg';
import EquisoftPlanMobile from '../../logos/plan/plan-reverse-mobile.svg';
import EquisoftPlan from '../../logos/plan/plan-reverse.svg';

const logoMapping = {
    default: EquisoftDefault,
    analyze: EquisoftAnalyze,
    analyzeMobile: EquisoftAnalyzeMobile,
    apply: EquisoftApply,
    applyMobile: EquisoftApplyMobile,
    centralize: EquisoftCentralize,
    centralizeMobile: EquisoftCentralizeMobile,
    connect: EquisoftConnect,
    connectMobile: EquisoftConnectMobile,
    design: EquisoftDesign,
    designMobile: EquisoftDesignMobile,
    illustrate: EquisoftIllustrate,
    illustrateMobile: EquisoftIllustrateMobile,
    manage: EquisoftManage,
    manageMobile: EquisoftManageMobile,
    plan: EquisoftPlan,
    planMobile: EquisoftPlanMobile,
} as const;

export type LogoName = keyof typeof logoMapping;

interface LogoProps {
    name?: LogoName;
}

export const Logo = ({ name = 'default' }: LogoProps): ReactElement | null => {
    const Component = logoMapping[name];

    return Component ? <Component style={{ height: '100%' }}/> : null;
};
