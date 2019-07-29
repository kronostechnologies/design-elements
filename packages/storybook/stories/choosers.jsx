import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    Chooser,
    ChooseRadio,
    VisuallyHidden,
} from '@equisoft/design-elements-react';

storiesOf('Choosers', module)
    .add('Chooser Default', () => (
        <Chooser>
            <ChooseRadio id="ar_1" groupName="maritalStatus" value="single">
                Célibataire, vivant seul ou en colocation
            </ChooseRadio>

            <ChooseRadio id="ar_2" groupName="maritalStatus" value="married">
                Marié ou vivant avec  un conjoint
            </ChooseRadio>

            <ChooseRadio id="ar_6" groupName="maritalStatus" value="">
                Préfère ne pas répondre
            </ChooseRadio>
        </Chooser>
    ))

    .add('Chooser in Columns', () => (
        <Chooser inColumns>
            <ChooseRadio id="ar_1" groupName="ageRange" value="0,24">
                0 à 24 ans
            </ChooseRadio>

            <ChooseRadio id="ar_2" groupName="ageRange" value="25,34">
                25 à 34 ans
            </ChooseRadio>

            <ChooseRadio id="ar_3" groupName="ageRange" value="35,49">
                35 à 49 ans
            </ChooseRadio>

            <ChooseRadio id="ar_4" groupName="ageRange" value="50,64">
                50 à 64 ans
            </ChooseRadio>

            <ChooseRadio id="ar_5" groupName="ageRange" value="65,Infinity">
                65+
            </ChooseRadio>

            <ChooseRadio id="ar_6" groupName="ageRange" value="">
                Préfère ne pas répondre
            </ChooseRadio>
        </Chooser>
    ));
