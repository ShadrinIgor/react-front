'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CourseListItem from "js/components/CourseListItem";
import {MemoryRouter} from "react-router-dom";

const t = key => key;

describe('CourseListItem Component', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<MemoryRouter initialEntries={['/']}>
				<CourseListItem t={t} course={{}}/>
			</MemoryRouter>
			, div);
	});
});