import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from './App.module.scss';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);

	function arrowClickHandler() {
		setIsOpen(!isOpen);
	}

	function closeClickHandler() {
		isOpen && setIsOpen(!isOpen);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onArrowClick={arrowClickHandler}
				pageState={pageState}
				setPageState={setPageState}
			/>
			<Article onClose={closeClickHandler} />
		</main>
	);
};
