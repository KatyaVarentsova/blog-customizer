import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface IArticleParamsFormProps {
	isOpen: boolean;
	onArrowClick: () => void;
	pageState: ArticleStateType;
	setPageState: Dispatch<SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({
	isOpen,
	onArrowClick,
	pageState,
	setPageState,
}: IArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(pageState);

	useEffect(() => {
		setFormState(pageState);
	}, [pageState]);

	const submitHandler = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setPageState(formState);
		},
		[formState, setPageState]
	);

	const resetHandler = useCallback(() => {
		setPageState(defaultArticleState);
	}, [pageState]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => onArrowClick()} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={submitHandler}
					onReset={resetHandler}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
					/>

					<RadioGroup
						title='Название радиогруппы'
						name='radio'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
