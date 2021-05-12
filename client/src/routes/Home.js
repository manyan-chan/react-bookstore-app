import { Image } from '@chakra-ui/image';
import {
	Badge,
	Box,
	Container,
	Heading,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/layout';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	FormControl,
	Input,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [data, setData] = useState([]);
	const [initData, setInitData] = useState([]);
	const [search, setSearch] = useState('');
	const [reset, setReset] = useState('');
	const [category, setCategory] = useState('');

	const sortPrice = () => {
		const newData = [...data].sort((a, b) => {
			return a.price < b.price ? 1 : b.price < a.price ? -1 : 0;
		});
		setData(newData);
	};

	const searchByCategory = (event) => {
		event.preventDefault();
		setCategory(event.target.textContent);
		axios
			.get('http://localhost:5000/books', {
				params: {
					category: event.target.textContent,
				},
			})
			.then((res) => setData(res.data))
			.catch((err) => {
				console.log(err);
			});
	};

	const searchByName = (event) => {
		event.preventDefault();
		setCategory('');
		axios
			.get('http://localhost:5000/books', {
				params: {
					name: search,
				},
			})
			.then((res) => setData(res.data))
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get('http://localhost:5000/books')
			.then((res) => {
				setInitData(res.data);
				setData(res.data);
				setCategory('');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reset]);

	const set = new Set();
	for (const item of initData) {
		set.add(item.category);
	}
	const array = Array.from(set);

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink isCurrentPage>{category}</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<form
				onSubmit={(event) => {
					searchByName(event);
				}}>
				<FormControl m='5' align='center'>
					<Input
						maxW='md'
						placeholder='keyword(s)'
						onChange={(event) => {
							setSearch(event.target.value);
						}}></Input>
					<Button type='submit' m='5'>
						Search
					</Button>
					<Button m='5' onClick={() => setReset(reset + 1)}>
						Reset
					</Button>
				</FormControl>
			</form>
			<Container mt='5' mb='5'>
				<Heading size='md' mb='2'>
					Category
				</Heading>
				<Stack spacing='5' direction={['column', 'row']}>
					{array.map((i) => {
						return (
							<Button
								key={i}
								onClick={(event) => {
									searchByCategory(event);
								}}>
								{i}
							</Button>
						);
					})}
				</Stack>
			</Container>
			<Container mb='5'>
				<Heading size='md' mb='2'>
					Sort
				</Heading>
				<Stack direction='row'>
					<Button
						onClick={() => {
							sortPrice();
						}}>
						Sort by Price (Highest)
					</Button>
				</Stack>
			</Container>

			<Wrap justify='center' className='booksView'>
				{data.map((book, index) => {
					const imagePath = `http://127.0.0.1:5000/images/${book.bookImage}`;
					const newArrival = book.newArrival ? 'New Arrival' : '';
					return (
						<WrapItem key={index} className={book._id}>
							<Box p='2' borderWidth='1px' borderRadius='lg' maxW='sm'>
								<Link to={{ pathname: '/book', state: book }}>
									{book.bookName}
								</Link>
								<Image src={imagePath} w='sm' h='sm' objectFit='contain' />
								<Badge colorScheme='green'>{newArrival}</Badge>
								<Text>Author: {book.author}</Text>
								<Text>Publisher: {book.publisher}</Text>
								<Text>Price: {book.price}</Text>
							</Box>
						</WrapItem>
					);
				})}
			</Wrap>
		</div>
	);
};

export default Home;
