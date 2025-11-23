import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';
import { components, buttons, shadows, Icon } from 'decap-cms-ui-default';

const CollectionTopContainer = styled.div`
  ${components.cardTop};
  margin-bottom: 22px;
`;

const CollectionTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CollectionTopHeading = styled.h1`
  ${components.cardTopHeading};

  @media (max-width: 800px) {
    font-size: 20px;
  }
`;

const CollectionTopNewButton = styled(Link)`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};

  padding: 0 30px;

  .new-button-full {
    display: inline;
  }
  .new-button-short {
    display: none;
  }

  @media (max-width: 800px) {
    padding: 0 15px;
    .new-button-full {
      display: none;
    }
    .new-button-short {
      display: inline;
    }
  }
`;

const HamburgerButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${buttons.gray};
  padding: 8px 12px;
  margin-right: 12px;
  display: none;
  align-items: center;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const CollectionTopDescription = styled.p`
  ${components.cardTopDescription};
  margin-bottom: 0;
`;

function getCollectionProps(collection) {
  const collectionLabel = collection.get('label');
  const collectionLabelSingular = collection.get('label_singular');
  const collectionDescription = collection.get('description');

  return {
    collectionLabel,
    collectionLabelSingular,
    collectionDescription,
  };
}

function CollectionTop({ collection, newEntryUrl, t, onSidebarToggle }) {
  const { collectionLabel, collectionLabelSingular, collectionDescription } = getCollectionProps(
    collection,
    t,
  );

  return (
    <CollectionTopContainer>
      <CollectionTopRow>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {onSidebarToggle && (
            <HamburgerButton onClick={onSidebarToggle}>
              <Icon type="list" size="small" />
            </HamburgerButton>
          )}
          <CollectionTopHeading>{collectionLabel}</CollectionTopHeading>
        </div>
        {newEntryUrl ? (
          <CollectionTopNewButton to={newEntryUrl}>
            <span className="new-button-full">
              {t('collection.collectionTop.newButton', {
                collectionLabel: collectionLabelSingular || collectionLabel,
              })}
            </span>
            <span className="new-button-short">{t('collection.collectionTop.newShort')}</span>
          </CollectionTopNewButton>
        ) : null}
      </CollectionTopRow>
      {collectionDescription ? (
        <CollectionTopDescription>{collectionDescription}</CollectionTopDescription>
      ) : null}
    </CollectionTopContainer>
  );
}

CollectionTop.propTypes = {
  collection: ImmutablePropTypes.map.isRequired,
  newEntryUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  onSidebarToggle: PropTypes.func,
};

export default translate()(CollectionTop);
