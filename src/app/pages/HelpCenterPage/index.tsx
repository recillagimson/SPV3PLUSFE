import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'app/components/Elements/Button';

import * as S from './HelpCenter.style';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

const MOCK_DATA = [
  {
    id: '1',
    name: 'How do I change my pin?',
    description: 'Lorem Ipsum dolor amet. Bacon Lorem Ipsum dolor amet imis mea',
  },
  {
    id: '2',
    name: 'How do I set up my recovery account?',
    description: 'Lorem Ipsum dolor amet. Bacon Lorem Ipsum dolor amet imis mea',
  },
  {
    id: '3',
    name: 'What should I do if I forgot my pin code?',
    description: 'Lorem Ipsum dolor amet. Bacon Lorem Ipsum dolor amet imis mea',
  },
  {
    id: '4',
    name: 'How do I cash in via ATM?',
    description: 'Lorem Ipsum dolor amet. Bacon Lorem Ipsum dolor amet imis mea',
  },
];

export function HelpCenterPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  console.log('actions', actions);
  const [tab, changeTab] = React.useState({});
  const [filteredItems, setFileredItems] = React.useState(MOCK_DATA);
  const hasActiveTab = !!Object.keys(tab).length;

  React.useEffect(() => {
    dispatch(actions.getFetchLoading()); 
  }, [actions, dispatch]);

  const onSearchList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const searchedItems = MOCK_DATA.filter((item: any) => {
      return (
        item.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1 ||
        item.description.toLowerCase().search(searchTerm.toLowerCase()) !== -1
      );
    });
    if (searchTerm.length) {
      setFileredItems(searchedItems);
    } else {
      setFileredItems(MOCK_DATA);
    }
  };

  return (
    <>
      <Helmet>
        <title>Help center</title>
      </Helmet>
      <S.Wrapper>
        <S.HelpCenterHeader>
          {hasActiveTab ? (
            <S.HelpCenterBack onClick={() => changeTab({})}>
              Back
            </S.HelpCenterBack>
          ) : (
            <h3>Help center</h3>
          )}
        </S.HelpCenterHeader>
        <S.HelpCenterContent>
          {hasActiveTab ? (
            <React.Fragment>
              <S.HelpCenterDescriptionContainer>
                <S.HelpCenterTitleDescription>
                  How do I change my pin?
                </S.HelpCenterTitleDescription>
                <S.HelpCenterDate>4 months ago</S.HelpCenterDate>
              </S.HelpCenterDescriptionContainer>
              <S.HelpCenterDescription>
                Lorem Ipsum dolor amet. Bacon Lorem Ipsum dolor amet imis mea
              </S.HelpCenterDescription>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <S.SearchContainer>
                <h3>How can we help you today</h3>
                <S.SearchBar
                  type="text"
                  placeholder="Search"
                  onChange={onSearchList}
                />
              </S.SearchContainer>
              <S.List>
                {filteredItems.map(d => (
                  <S.ListItem key={d.id}>
                    <S.ItemTitle>{d.name}</S.ItemTitle>
                    <FontAwesomeIcon
                      icon="angle-right"
                      onClick={() => changeTab(d)}
                    />
                  </S.ListItem>
                ))}
              </S.List>
            </React.Fragment>
          )}
        </S.HelpCenterContent>
      </S.Wrapper>
    </>
  );
}
