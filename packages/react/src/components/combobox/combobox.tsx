import { ForwardedRef, forwardRef, FunctionComponent, useState } from 'react';
import { IconButton } from '../buttons/icon-button';
import { Listbox, ListboxOption } from '../listbox/listbox';
import { TextInput } from '../text-input/text-input';

interface Props {
    /**
     * { value: string; label?: string; }[]
     */
    options: ListboxOption[];
}

export const Combobox: FunctionComponent<Props> = forwardRef(({
    options,
}, ref: ForwardedRef<HTMLInputElement | null>) => {
    const [listBoxOpened, setListBoxOpened] = useState<boolean>(false);

    return (
        <div>
            <TextInput ref={ref} />
            <IconButton
                buttonType="primary"
                iconName={listBoxOpened ? 'arrowDown' : 'arrowUp'}
                onClick={() => setListBoxOpened(!listBoxOpened)}
            />
            {listBoxOpened && <Listbox options={options} />}
        </div>
    );
});
