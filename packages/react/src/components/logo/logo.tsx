import { type FC } from 'react';
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
import EquisoftLifeguide from '../../logos/lifeguide/lifeguide.svg';
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
    lifeguide: {
        desktop: EquisoftLifeguide,
        mobile: EquisoftLifeguide,
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

export interface LogoProps {
    className?: string;
    name?: LogoName;
    mobile?: boolean;
}

export const Logo: FC<LogoProps> = ({
    className,
    mobile = false,
    name = 'default',
}) => {
    const Component = logoMapping[name][mobile ? 'mobile' : 'desktop'];

    return <Component className={className} focusable="false" aria-hidden="true" />;
};

Logo.displayName = 'Logo';
