import * as React from 'react';
import Grid from 'app/components/Elements/Grid';
import LetterAvatar from '../../components/LetterAvatar';
import { StyleConstants } from 'styles/StyleConstants';

import { useHistory } from 'react-router-dom';

export default function NotificationMessage({ data, isSelected }) {
  const { id, title, created_at, description } = data;
  const history = useHistory();

  const dateFormater = date => {
    const jsDate = new Date(date);
    return `${jsDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })} | ${jsDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`;
  };

  return isSelected ? (
    <Grid
      rows="1fr 1fr"
      key={data.id}
      style={{
        padding: '10px 0',
      }}
      onClick={() => history.push(`/notifications/${data.id}`)}
    >
      <Grid columns="auto 1fr" gap="15px">
        <LetterAvatar>{data.title.charAt(0)}</LetterAvatar>
        <div>
          <span
            style={{
              color: StyleConstants.BUTTONS.mainTextColor,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {data.title}
          </span>
          <div
            style={{
              color: '#A9B1B8',
              fontSize: '12px',
              margin: 'px 0',
            }}
          >
            {dateFormater(data.created_at)}
          </div>
        </div>
      </Grid>
      <div
        style={{
          fontSize: '14px',
          color: StyleConstants.MAIN_TEXT,
          overflow: 'hidden',
          padding: '10px 0',
        }}
      >
        {data.description}
      </div>
    </Grid>
  ) : (
    <Grid
      columns="auto 1fr"
      gap="15px"
      key={id}
      style={{
        padding: '10px 0',
        borderBottom: `1px solid ${StyleConstants.BORDER_COLOR}`,
        cursor: 'pointer',
      }}
      onClick={() => history.push(`/notifications/${id}`)}
    >
      <LetterAvatar>{title.charAt(0)}</LetterAvatar>
      <div>
        <span
          style={{
            color: StyleConstants.BUTTONS.mainTextColor,
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          {title}
        </span>
        <div
          style={{
            color: '#A9B1B8',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {dateFormater(created_at)}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: StyleConstants.MAIN_TEXT,
            overflow: 'hidden',
            height: '20px',
          }}
        >
          {description}
        </div>
      </div>
    </Grid>
  );
}
