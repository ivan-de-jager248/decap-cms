import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Icon } from 'decap-cms-ui-default';

import MediaLibrarySearch from './MediaLibrarySearch';
import MediaLibraryHeader from './MediaLibraryHeader';
import {
  UploadButton,
  DeleteButton,
  DownloadButton,
  CopyToClipBoardButton,
  InsertButton,
} from './MediaLibraryButtons';

const LibraryTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  gap: 10px;

  @media (min-width: 600px) {
    padding: 0;
  }
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: 600px) {
    flex-wrap: nowrap;
    gap: 0;
  }
`;

const ButtonsContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  @media (min-width: 600px) {
    gap: 0;
  }
`;

function MediaLibraryTop({
  t,
  onClose,
  privateUpload,
  forImage,
  onDownload,
  onUpload,
  query,
  onSearchChange,
  onSearchKeyDown,
  searchDisabled,
  onDelete,
  canInsert,
  onInsert,
  hasSelection,
  isPersisting,
  isDeleting,
  selectedFile,
}) {
  const shouldShowButtonLoader = isPersisting || isDeleting;
  const uploadEnabled = !shouldShowButtonLoader;
  const deleteEnabled = !shouldShowButtonLoader && hasSelection;

  const uploadButtonLabel = isPersisting
    ? t('mediaLibrary.mediaLibraryModal.uploading')
    : t('mediaLibrary.mediaLibraryModal.upload');
  const deleteButtonLabel = isDeleting
    ? t('mediaLibrary.mediaLibraryModal.deleting')
    : t('mediaLibrary.mediaLibraryModal.deleteSelected');
  const downloadButtonLabel = t('mediaLibrary.mediaLibraryModal.download');
  const insertButtonLabel = t('mediaLibrary.mediaLibraryModal.chooseSelected');

  return (
    <LibraryTop>
      <RowContainer>
        <MediaLibraryHeader
          onClose={onClose}
          title={`${privateUpload ? t('mediaLibrary.mediaLibraryModal.private') : ''}${
            forImage
              ? t('mediaLibrary.mediaLibraryModal.images')
              : t('mediaLibrary.mediaLibraryModal.mediaAssets')
          }`}
          isPrivate={privateUpload}
        />
        <ButtonsContainer>
          <CopyToClipBoardButton
            disabled={!hasSelection}
            path={selectedFile.path}
            name={selectedFile.name}
            draft={selectedFile.draft}
            t={t}
          />
          <DownloadButton onClick={onDownload} disabled={!hasSelection} title={downloadButtonLabel}>
            <span className="button-text">{downloadButtonLabel}</span>
            <Icon type="arrow" direction="down" size="small" className="button-icon" />
          </DownloadButton>
          <UploadButton
            label={uploadButtonLabel}
            imagesOnly={forImage}
            onChange={onUpload}
            disabled={!uploadEnabled}
          />
        </ButtonsContainer>
      </RowContainer>
      <RowContainer>
        <MediaLibrarySearch
          value={query}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          placeholder={t('mediaLibrary.mediaLibraryModal.search')}
          disabled={searchDisabled}
        />
        <ButtonsContainer>
          <DeleteButton onClick={onDelete} disabled={!deleteEnabled} title={deleteButtonLabel}>
            <span className="button-text">{deleteButtonLabel}</span>
            <Icon type="close" size="small" className="button-icon" />
          </DeleteButton>
          {!canInsert ? null : (
            <InsertButton onClick={onInsert} disabled={!hasSelection} title={insertButtonLabel}>
              <span className="button-text">{insertButtonLabel}</span>
              <Icon type="add" size="small" className="button-icon" />
            </InsertButton>
          )}
        </ButtonsContainer>
      </RowContainer>
    </LibraryTop>
  );
}

MediaLibraryTop.propTypes = {
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  privateUpload: PropTypes.bool,
  forImage: PropTypes.bool,
  onDownload: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  query: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onSearchKeyDown: PropTypes.func.isRequired,
  searchDisabled: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  canInsert: PropTypes.bool,
  onInsert: PropTypes.func.isRequired,
  hasSelection: PropTypes.bool.isRequired,
  isPersisting: PropTypes.bool,
  isDeleting: PropTypes.bool,
  selectedFile: PropTypes.oneOfType([
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      draft: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }),
    PropTypes.shape({}),
  ]),
};

export default MediaLibraryTop;
