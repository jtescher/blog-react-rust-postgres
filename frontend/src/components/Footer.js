import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_PUBLISHED">
      Published
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_DRAFTS">
      Drafts
    </FilterLink>
  </p>
)

export default Footer;
