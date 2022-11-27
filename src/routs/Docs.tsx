import React from "react";

export const Docs = () => {
  
  return (
    <div className="m-4 p-4 2xl:p- 2xl:m-8 2xl:w-5/6 bg-white dark:bg-neutral-900">
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Getting started with <code> malo_bot </code></h3>
      <p className="text-lg mt-4">
        <code> malo_bot </code>
        is frontend-only Telegram chatbot application. It helps you create your
        own chatbot without any coding.
      </p>
      <p className="text-lg mt-4">
        Typical chatbot lives in the server or cloud instance and uses this
        server for receiving, sending messages and running logic. With <code>malo_bot</code> your bot will live in your computer, just in your browser but still be
        able to communicate with any Telegram users worldwide. Whether
        you&apos;re not familiar with chatbots and coding, <code>malo_bot</code> required no experience for creating a mighty chatbot with complicated
        logic.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Installation
      </h3>
      <p className="text-lg mt-4">
        For start you need a bot Telegram account.{" "}
      </p>
      <p className="text-lg mt-4">
        Telegram Bots are special accounts that do not require an additional
        phone number to set up. These accounts serve as an interface for your
        application. Users will communicate with your chatbot via Telegram
        through a chat named like a &quot;myNewChatbotName_bot&quot; available
        through the link like a &quot;https://t.me/myNewChatbotName_bot&quot;.
      </p>
      <p className="text-lg mt-4">
        How do you get this Telegram bot account? You can use one if you already
        have it or create a new one with &quot;Botfather&quot;. Botfather is the
        special Telegram superbot for creating bot accounts. Send a message to
        @BotFather in Telegram and follow instructions for choosing the name of
        your bot and getting the token. This token is a unique key for managing
        your bot.
      </p>
      <p className="text-lg mt-4">
        So, now you have a bot name like a &quot;myNewChatbotName_bot&quot; and
        token which looks like a
        &quot;2528363602:UUEXMQAom6FM9xpg2r2pwHgXNHzaddiCOn8&quot;. Log in to <code>malo_bot</code> application with this name and token (you can see the form for name and
        token in the menu of application at left).
      </p>
      <p className="text-lg mt-4">
        If no mistakes were made, you&apos;ve logged-in successfully and now you
        see a link in the menu like a
        &quot;https://t.me/myNewChatbotName_bot&quot;.{" "}
      </p>
      <p className="text-lg mt-4">
        Congratulations! Your bot is in the air now.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Using chatbot.
      </h3>
      <p className="text-lg mt-4">
        Important note: your users have to start a conversation first hand.
        Chatbots can&apos;t send anything to Telegram user without the initial
        activity of the user. That&apos;s the Telegram rules. 
      </p>
      <p className="text-lg mt-4">
        So, it is time to
        test your chatbot. Try to contact Telegram chat
        &quot;myNewChatbotName_bot&quot; or send a link to your friend which
        looks like a &quot;https://t.me/myNewChatbotName_bot&quot;. Send
        anything to this chat or push the &apos;start&apos; button. If all is OK
        you&apos;ll get the answer from chatbot or greeting. It works. Check the
        &apos;Working area&apos; in the menu in the <code>malo_bot</code>
        app. You see a chatbot admin panel and the message list. Here messages
        from users and answers from the bot. You can override chatbot logic and
        write a message directly to your user. Just write and send the message.
        Like in a common Telegram messenger. Application logic. Let&apos;s set
        up some definitions.
      </p>
      <p className="text-lg mt-4">
        &apos;Reaction&apos; is the intent with keywords and the answer. Your
        user writes something to chatbot. The reaction triggered if his message
        exactly matches any setted keyword. Triggered reaction drives <code>malo_bot</code> app logic and your chatbot sends this reaction answer. &apos;User send a
        message&apos; &gt; &apos;Chatbot check if it matches any keyword&apos;
        &gt; &apos;If matches, some reaction is triggered&apos; &gt;
        &apos;Chatbot sends answer back to the user&apos; You can add, change
        and delete reactions, keywords and answers in the Working area.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Default answer
      </h3>
      <p className="text-lg mt-4">
        What happens if user write a nonsense or just anything with no match
        with keywords? Like a &quot;adffdfdaaa&quot;? Well, chatbot send a
        default answer to user, like a &quot;You said &quot;adffdfdaaa&quot;. I
        don&apos;t understand you&quot;. You can change the default answer in
        Settings. Also you can remove the citation of the user&apos;s message.
        Add a new reaction. Go to the Working area. Write a reaction name. It
        can be anything, let it be &apos;first_cat&apos;. Next, write an answer.
        Let&apos;s say &quot;Hello from Cat&quot;
      </p>
      <p className="text-lg mt-4">
        What will be a keywords for this reaction? For example, we want to
        trigger this reaction on &quot;meow&quot; and &quot;hi cat&quot;. Write
        it separated by comma: &quot;meow, hi cat&quot;. Click the button
        &apos;Add reaction&apos;. You see now: the new reaction card emerged
        below the reaction form. It contains the name &quot;first_cat&quot;,
        answer &quot;Hello from Cat&quot; and the keywords &quot;meow&quot; and
        &quot;hi cat&quot;. So, now if your user writes a &quot;meow&quot;
        message - chatbot sends the message &quot;Hello from Cat&quot; back.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Nested reactions.
      </h3>
      <p className="text-lg mt-4">
        Imagine, we want to make a complicated chatbot. Like a game with
        tree-like logic. User starts to play from a crossroad on the root of
        tree, choose one path, then the next crossroad, choose a path again and
        so on.
      </p>
      <p className="text-lg mt-4">
        How can we do this in the <code>malo_bot</code> app? We need the nested logic. Reactions can be achieved not only from
        the &apos;root&apos; of our tree, but also from another reaction. Our
        reaction can be a parent and have own childs. So, bot can keep the state
        of conversation, sticks with the context of chatting.
      </p>
      <p className="text-lg mt-4">
        Here is an example. We already have our custom &quot;first_cat&quot;
        reaction and three other mock-up default reactions:
        &quot;hello_reaction&quot;, &quot;first_dog&quot; and
        &quot;second_dog&quot;. User write a &quot;woof&quot; message and get a
        &quot;First dog&apos;s answer&quot;. Our bot keeps the context in mind:
        &quot;Now we talking about dogs, OK&quot;. And if the user write
        &quot;woof&quot; again - the &quot;Second dog&apos;s answer&quot; will
        be sent back. Got it? Same &quot;woof&quot; input triggers different
        reaction: &quot;First..&quot; and &quot;Second...&quot;. We can get
        &quot;Second...&quot; only if we already triggered &quot;First...&quot;.
        Let&apos;s write a child for our &quot;first_cat&quot;.
      </p>
      <p className="text-lg mt-4">
        When you write a new reaction, say, &quot;second_cat&quot; with the same
        keyword &quot;meow&quot;, you can choose a parent for this new reaction
        - click &apos;Parent reaction&apos; and you will see available
        reactions. Now, user can get answer from &quot;second_cat&quot; only if
        user triggered &quot;first_cat&quot; with previous &quot;meow&quot;
        message.
      </p>
      <p className="text-lg mt-4">
        What happens if our user writes &quot;meow&quot; a third time? Nothing
        special - there is no &quot;third_cat&quot; with &quot;meow&quot;
        keyword, so state of conversation falls back to root and user get answer
        from &quot;first_cat&quot;. 
      </p>
      <p className="text-lg mt-4">
        Try to use this ability of nested reaction
        for creation of game with tree-like state structure. One parent can have
        many childs. 
      </p>
      <p className="text-lg mt-4">Imagine something like a &quot;magicHighway&quot; 
      </p>
      <p className="text-lg mt-4">
        with childs &quot;magicHighway~leftRoad&quot;,
        &quot;magicHighway~rightRoad&quot; 
      </p>
      <p className="text-lg mt-4">
        Each childs have their own branches
      </p>
      <p className="text-lg mt-4">
        &quot;magicHighway~leftRoad~leftPath&quot;,
        &quot;magicHighway~leftRoad~rightPath&quot;,
        &quot;magicHighway~rightRoad~leftPath&quot;,
        &quot;magicHighway~rightRoad~rightPath&quot; and so on. 
      </p>
      <p className="text-lg mt-4">  
        Player will move
        along this tree and choose a way with messages.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Buttons in the message.
      </h3>
      <p className="text-lg mt-4">
        What happens if our user makes a typo in the message? Default &quot;I
        don&apos;t understand you&quot; answer will be sent back. We can give a
        hint or options for users. It is possible to add a ready buttons for
        awaited answers. Like a TV-quiz. &quot;What is the shape of Earth?&quot;
      </p>
      <ul>
        <li className="block w-3/12 text-left p-1 mt-1 border-2 bg-neutral-200 border-neutral-500 dark:bg-neutral-800 dark:border-neutral-700">
          A: cube
        </li>
        <li className="block w-3/12 text-left p-1 mt-1 border-2 bg-neutral-200 border-neutral-500 dark:bg-neutral-800 dark:border-neutral-700">
          B: sphere
        </li>
        <li className="block w-3/12 text-left p-1 mt-1 border-2 bg-neutral-200 border-neutral-500 dark:bg-neutral-800 dark:border-neutral-700">
          C: irregularly shaped ellipsoid
        </li>
        <li className="block w-3/12 text-left p-1 mt-1 border-2 bg-neutral-200 border-neutral-500 dark:bg-neutral-800 dark:border-neutral-700">
          D: flat
        </li>
      </ul>
      <p className="text-lg mt-4">
        Check checkbox below reaction form for adding buttons to the answer.User
        click popped up button and this button sends text in the button back to
        chatbot. Browse chats. You can overwatch chatbot activity. Click
        user&apos;s names in Working area and checks user&apos;s queries and
        bot&apos;s answers in individual chats.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        When the chatbot sleeps?
      </h3>
      <p className="text-lg mt-4">
        Never. If the <code>malo_bot</code> app is still open in your browser. Your chatbot lives right in your
        web-browser.
      </p>
      <p className="text-lg mt-4">
        So, if you surf another tab with another page or minimize browser window
        - it&apos;s OK. Bot still alive and answers to user&apos;s messages. But
        if you close your browser or shut down your PC - bot does not work.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Save my chatbot
      </h3>
      <p className="text-lg mt-4">
        We add a lot of logic and receive a lot of messages. How can we save our
        chatbot state?
      </p>
      <p className="text-lg mt-4">
        Do not worry. <code>malo_bot</code> has auto saving to the browser&apos;s database IndexedDB. When tomorrow
        you&apos;ll open <code>malo_bot</code> again - all log-in data and settings settled again without bothering
        you.
      </p>
      <p className="text-lg mt-4">
        Click Delete all data if you want to clear your application. It deletes
        all messages, log-in data and all settings and reactions.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Other settings
      </h3>
      <p className="text-lg mt-4">
        You can uncheck &quot;Chatbot is active&quot; in the Settings tab. Now
        the application works like a simple messenger. You can write messages
        from the bot account.
      </p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Safety
      </h3>
      <p className="text-lg mt-4">
        Chatbot works in a safe and reliable web-browser environment.No threats
        to your computer or personal data.
      </p>
      <p className="text-lg mt-4"> Just like any web-site in the browser.</p>
      <h3 className="text-2xl mt-8 font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        Other tips
      </h3>
      <p className="text-lg mt-4">
        Keep running only one copy of <code>malo_bot</code> application.
      </p>
      <p className="text-lg mt-4">
        We recommended using <code>malo_bot</code> on the PC or laptop browser, like Google Chrome.
      </p>
      <p className="text-lg mt-4">
        If app faced any problem - just reload the page and all your data pulls
        from IndexedDB again and the app gets reload.
      </p>
    </div>
  );
};
