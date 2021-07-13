import '../styles/PostItem.scss';


function PostItem({ id, name, title, category, cover, }) {
	return (
		<li className='lmj-plant-item' >
			<img className='lmj-plant-item-cover' src={cover} alt={`${title} cover`} />
			{name}
		</li>
	)
}

export default PostItem; 
