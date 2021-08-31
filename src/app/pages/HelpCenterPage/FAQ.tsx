import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import H3 from 'app/components/Elements/H3';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemButton from 'app/components/List/ListItemButton';
import ListItemText from 'app/components/List/ListItemText';
import SearchBar from 'app/components/SearchBar';

import { faqs } from './faqs';

const AnswerWrapper = styled.div`
  padding: 5px;
  white-space: pre-wrap;

  strong {
    font-weight: 600;
  }

  ul {
    list-style: none;
    margin: 0 0 15px;
    padding: 0 0 0 10px;

    &.inline {
      display: flex;
      align-items: flex-start;

      li {
        width: 49%;
      }
    }

    li {
      padding: 0 5px 5px;
      white-space: pre-wrap;
    }
  }

  p {
    margin: 0 0 15px;
    white-space: pre-wrap;

    &.note {
      font-style: italic;
      font-size: 0.9em;
    }
  }
`;

export function FAQPage() {
  const [faqItems, setFaqItems] = React.useState([...faqs]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [answer, setAnswer] = React.useState({ question: '', answer: '' });

  const searchArray = (val: string = '') => {
    if (val !== '') {
      const newFaq = faqs.filter(f => {
        if (f.question.toLowerCase().includes(val)) {
          return f;
        }
        return null;
      });
      setFaqItems(newFaq);
    }

    if (val === '') {
      setFaqItems([...faqs]);
    }
  };

  let faq: {} | null | undefined;
  if (faqItems && faqItems.length > 0) {
    faq = faqItems.map(i => (
      <ListItem flex key={i.question.replace(' ', '-').toLowerCase()}>
        <ListItemButton
          onClick={() => {
            setShowAnswer(true);
            setAnswer(i);
          }}
          style={{
            flexGrow: 1,
          }}
        >
          {i.question} <FontAwesomeIcon icon="chevron-right" />
        </ListItemButton>
      </ListItem>
    ));
  }

  if (faqItems && faqItems.length === 0) {
    faq = (
      <ListItem flex>
        <ListItemText
          primary="No Results found."
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
    );
  }

  return (
    <ProtectedContent>
      <Helmet>
        <title>FAQ [Help Center]</title>
      </Helmet>

      {!showAnswer && (
        <Box title="FAQ" titleBorder withPadding>
          <H3 className="text-center">How can we help you today?</H3>
          <SearchBar onChange={searchArray} />
          <List divider bordertop>
            {faq}
          </List>
        </Box>
      )}
      {showAnswer && (
        <Box
          title="Back"
          onBack={() => {
            setShowAnswer(false);
            setAnswer({ question: '', answer: '' });
          }}
          titleBorder
          withPadding
        >
          <H3 margin="10px 0 20px">{answer.question}</H3>
          <AnswerWrapper dangerouslySetInnerHTML={{ __html: answer.answer }} />
        </Box>
      )}
    </ProtectedContent>
  );
}
