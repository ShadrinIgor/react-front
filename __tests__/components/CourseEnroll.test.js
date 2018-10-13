'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CourseEnroll from "js/components/CourseEnroll";
import {MemoryRouter} from "react-router-dom";

const t = key => key;

describe('CourseEnroll Component', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MemoryRouter initialEntries={['/users/2']}>
			<CourseEnroll t={t} enrollUrl="#"/>
		</MemoryRouter>, div);
	});
});