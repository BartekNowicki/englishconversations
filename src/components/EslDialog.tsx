import tablet from '../assets/tablet.png';

const eslDialogDivStyle = {
    backgroundImage: `url(${tablet})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left',
        padding: '150px 70px 150px 70px',
        color: 'brown',
        height: '100%',
        minHeight: '100%',
        marginTop: '50px',
        marginBottom: '0px',
        borderRadius: '20px'
  };

const EslDialog = () => {
  return (
    <div style={eslDialogDivStyle}>
      <p><strong>Tom:</strong> I’ve been thinking, guys. We should really <strong>sign up for</strong> those conversation classes. I mean, it’s one thing <strong>to pick up vocabulary</strong>, but actually speaking it makes a difference.</p>
      <p><strong>Sara:</strong> Totally! When I started <strong>taking part in them</strong>, my confidence <strong>shot up</strong>. You can’t just learn grammar and hope <strong>to get by</strong> in real conversations.</p>
      <p><strong>Lily:</strong> Exactly! The more you practice with others, the more natural it feels. I used to <strong>freeze up</strong> when people spoke to me in English, but now <strong>I’m way more</strong> comfortable.</p>
      <p><strong>Tom:</strong> Right? Plus, <strong>you get to work on</strong> your pronunciation in real time. I’ve <strong>come across</strong> so many words that sound different than I expected.</p>
      <p><strong>Sara:</strong> And it’s not just about speaking. You also <strong>pick up on</strong> how native speakers use slang or phrasal verbs. <strong>That’s key!</strong></p>
      <p><strong>Lily:</strong> Yeah, and when you make mistakes, <strong>it’s no big deal</strong>. The lessons help you <strong>figure out what went wrong</strong> and how to <strong>move forward</strong>.</p>
    </div>
  );
};

export default EslDialog;
