import React from 'react';

const About = () => {
  return <div className='m-5 about-con'><div className='m-5'><p className='h-6 about'>
    I am a sound artist and really interested in archiving sound of physical spaces in forms of impulse responses in a common respository.
    Due to the lockdowns we have had over the past 2 years, I haven not been able to collect IR data around India and my city of Delhi, but i plan to do that as soon as things go back to a bit normal.

    I have made this app for anyone to be able to experience the sound of these spaces. It connects to your browser microphone. Be sure to use headphones or a sound setup to avoid a feedback loop.
    <br />
    <br />
    Impulse data from  <a href='https://openairlib.net'>OpenAirLib</a>, a project from the university of york and EchoThief impulse response library.
    <br />
    <br />
    I am currently setting up a process for anyone to be able to add an impulse response for a place to the respository. If you would like to do that now, you could mail me at jayantmanchanda1@gmail.com
    <br/>
  </p></div></div>;
};

export default About;
