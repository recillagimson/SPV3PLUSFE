/**
 * Search Bar Component
 * @prop {function}   onChange      Callback when user enter/submit the form returns the string from the input bar
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components/macro';

import Input from 'app/components/Elements/Input';

import { usePrevious } from 'app/components/Helpers/Hooks';

const Form = styled.form`
  width: 100%;
  position: relative;
  margin: 8px 0 25px;

  input {
    padding-left: 40px;
  }

  svg {
    position: absolute;
    top: 15px;
    left: 15px;
    margin: 0;
  }
`;

type SearchBarProps = {
  onChange: (s: string) => void;
};

export default function SearchBard({ onChange }: SearchBarProps) {
  const [search, setSearch] = React.useState('');
  const prevSearch = usePrevious(search);

  React.useEffect(() => {
    if (search !== prevSearch) {
      onChange(search);
    }
  }, [onChange, prevSearch, search]);

  return (
    <Form>
      <Input
        onChange={e => setSearch(e.currentTarget.value)}
        type="text"
        value={search}
        placeholder="Search"
        name="search"
      />

      <FontAwesomeIcon icon={search === '' ? 'search' : 'times'} />
    </Form>
  );
}
