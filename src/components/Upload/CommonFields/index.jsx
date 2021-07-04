/*
 Copyright (C) 2021 Shruti Agarwal (mail2shruti.ag@gmail.com)

 SPDX-License-Identifier: GPL-2.0

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import React from "react";
import PropTypes from "prop-types";
import IgnoreScm from "./IgnoreScm";
import AccessLevel from "./AccessLevel";
import OptionalAnalysis from "./OptionalAnalysis";
import LicenseDecider from "./LicenseDecider";
import UploadReuse from "./UploadReuse";

function CommonFields({
  accessLevel,
  ignoreScm,
  analysis,
  decider,
  reuse,
  handleChange,
  handleScanChange,
}) {
  return (
    <>
      <IgnoreScm ignoreScm={ignoreScm} handleChange={handleChange} />
      <AccessLevel accessLevel={accessLevel} handleChange={handleChange} />
      <OptionalAnalysis analysis={analysis} handleChange={handleScanChange} />
      <LicenseDecider decider={decider} handleChange={handleScanChange} />
      <UploadReuse reuse={reuse} handleChange={handleScanChange} />
    </>
  );
}

CommonFields.propTypes = {
  accessLevel: PropTypes.string.isRequired,
  ignoreScm: PropTypes.bool.isRequired,
  analysis: PropTypes.shape({
    bucket: PropTypes.bool,
    copyrightEmailAuthor: PropTypes.bool,
    ecc: PropTypes.bool,
    keyword: PropTypes.bool,
    mime: PropTypes.bool,
    monk: PropTypes.bool,
    nomos: PropTypes.bool,
    ojo: PropTypes.bool,
    package: PropTypes.bool,
  }).isRequired,
  decider: PropTypes.shape({
    nomosMonk: PropTypes.bool,
    bulkReused: PropTypes.bool,
    newScanner: PropTypes.bool,
    ojoDecider: PropTypes.bool,
  }).isRequired,
  reuse: PropTypes.shape({
    reuseUpload: PropTypes.number,
    reuseGroup: PropTypes.string,
    reuseMain: PropTypes.bool,
    reuseEnhanced: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleScanChange: PropTypes.func.isRequired,
};

export default CommonFields;
