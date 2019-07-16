import React from 'react';
import { storiesOf } from '@storybook/react';
import { Chooser, ChooseRadio } from '@equisoft/design-elements-react';

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

    .add('Chooser In Columns', () => (
        <Chooser inColumns>
            <ChooseRadio id="ar_1" groupName="ageRange" value="0,24">
                <b>0 à 24 ans</b>
            </ChooseRadio>

            <ChooseRadio id="ar_2" groupName="ageRange" value="25,34">
                <b>25 à 34 ans</b>
            </ChooseRadio>

            <ChooseRadio id="ar_3" groupName="ageRange" value="35,49">
                <b>35 à 49 ans</b>
            </ChooseRadio>

            <ChooseRadio id="ar_4" groupName="ageRange" value="50,64">
                <b>50 à 64 ans</b>
            </ChooseRadio>

            <ChooseRadio id="ar_5" groupName="ageRange" value="65,Infinity">
                <b>65+</b>
            </ChooseRadio>

            <ChooseRadio id="ar_6" groupName="ageRange" value="">
                Préfère ne pas répondre
            </ChooseRadio>
        </Chooser>
    ));
