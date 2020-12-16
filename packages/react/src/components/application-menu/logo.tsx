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
    default: {
        desktop: EquisoftDefault,
        mobile: EquisoftDefault,
    },
    analyze: {
        desktop: EquisoftAnalyze,
        mobile: EquisoftAnalyzeMobile,
    },
    apply: {
        desktop: EquisoftApply,
        mobile: EquisoftApplyMobile,
    },
    centralize: {
        desktop: EquisoftCentralize,
        mobile: EquisoftCentralizeMobile,
    },
    connect: {
        desktop: EquisoftConnect,
        mobile: EquisoftConnectMobile,
    },
    design: {
        desktop: EquisoftDesign,
        mobile: EquisoftDesignMobile,
    },
    illustrate: {
        desktop: EquisoftIllustrate,
        mobile: EquisoftIllustrateMobile,
    },
    manage: {
        desktop: EquisoftManage,
        mobile: EquisoftManageMobile,
    },
    plan: {
        desktop: EquisoftPlan,
        mobile: EquisoftPlanMobile,
    },
};

export type LogoName = keyof typeof logoMapping;

interface LogoProps {
    name?: LogoName;
    mobile?: boolean;
}

export const Logo = ({ name = 'default', mobile = false }: LogoProps): ReactElement | null => {
    const Component = logoMapping[name][mobile ? 'mobile' : 'desktop'];

    return <Component style={{ height: '100%' }} focusable="false" aria-hidden="true" />;
};
