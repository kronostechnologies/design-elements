import { ReactElement } from 'react';

import EquisoftAnalyzeMobile from '../../logos/analyze/analyze-reverse-mobile.svg';
import EquisoftAnalyze from '../../logos/analyze/analyze-reverse.svg';
import EquisoftApplyMobile from '../../logos/apply/apply-reverse-mobile.svg';
import EquisoftApply from '../../logos/apply/apply-reverse.svg';
import EquisoftCentralizeMobile from '../../logos/centralize/centralize-reverse-mobile.svg';
import EquisoftCentralize from '../../logos/centralize/centralize-reverse.svg';
import EquisoftConnect from '../../logos/connect/connect-reverse.svg';
import EquisoftDesignMobile from '../../logos/design/design-reverse-mobile.svg';
import EquisoftDesign from '../../logos/design/design-reverse.svg';
import EquisoftIllustrateMobile from '../../logos/illustrate/illustrate-reverse-mobile.svg';
import EquisoftIllustrate from '../../logos/illustrate/illustrate-reverse.svg';
import EquisoftDefault from '../../logos/logo-equisoft-reversed.svg';
import EquisoftManageMobile from '../../logos/manage/manage-reverse-mobile.svg';
import EquisoftManage from '../../logos/manage/manage-reverse.svg';
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
        mobile: EquisoftConnect,
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
        mobile: EquisoftPlan,
    },
};

export type LogoName = keyof typeof logoMapping;

interface LogoProps {
    name?: LogoName;
    mobile?: boolean;
}

const smallLogos: LogoName[] = ['default', 'plan', 'connect'];

function getLogoHeight({ name, mobile }: Required<LogoProps>): string {
    if (!mobile && smallLogos.includes(name)) {
        return '24px';
    }
    return '100%';
}

export const Logo = ({ name = 'default', mobile = false }: LogoProps): ReactElement | null => {
    const Component = logoMapping[name][mobile ? 'mobile' : 'desktop'];

    const height = getLogoHeight({ name, mobile });

    return <Component style={{ height }} focusable="false" aria-hidden="true" />;
};

Logo.displayName = 'Logo';
