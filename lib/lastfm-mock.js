'use strict'

var artists = 
{
    'results': {
        'opensearch:Query': {
            '#text': '',
            'role': 'request',
            'searchTerms': 'cher',
            'startPage': '1'
        },
        'opensearch:totalResults': '61269',
        'opensearch:startIndex': '0',
        'opensearch:itemsPerPage': '30',
        'artistmatches': {
            'artist': [
                {
                    'name': 'Cher',
                    'listeners': '1111503',
                    'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                    'url': 'https://www.last.fm/music/Cher',
                    'streamable': '0',
                    'image': [
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/879a88760860cc472d826ca4e7fc5ad6.png',
                            'size': 'small'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/879a88760860cc472d826ca4e7fc5ad6.png',
                            'size': 'medium'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/879a88760860cc472d826ca4e7fc5ad6.png',
                            'size': 'large'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/879a88760860cc472d826ca4e7fc5ad6.png',
                            'size': 'extralarge'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/879a88760860cc472d826ca4e7fc5ad6.png',
                            'size': 'mega'
                        }
                    ]
                },
                {
                    'name': 'Cheryl Cole',
                    'listeners': '629187',
                    'mbid': '2d499150-1c42-4ffb-a90c-1cc635519d33',
                    'url': 'https://www.last.fm/music/Cheryl+Cole',
                    'streamable': '0',
                    'image': [
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/b6f72baf463b4caea21b7a929718f243.png',
                            'size': 'small'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/b6f72baf463b4caea21b7a929718f243.png',
                            'size': 'medium'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/b6f72baf463b4caea21b7a929718f243.png',
                            'size': 'large'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/b6f72baf463b4caea21b7a929718f243.png',
                            'size': 'extralarge'
                        },
                        {
                            '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/b6f72baf463b4caea21b7a929718f243.png',
                            'size': 'mega'
                        }
                    ]
                }
            ]
        }
    }
}
var albums = {
    'topalbums': {
        'album': [
            {
                'name': 'Believe',
                'playcount': 2383069,
                'mbid': '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd',
                'url': 'https://www.last.fm/music/Cher/Believe',
                'artist': {
                    'name': 'Cher',
                    'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                    'url': 'https://www.last.fm/music/Cher'
                },
                'image': [
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/3b54885952161aaea4ce2965b2db1638.png',
                        'size': 'small'
                    },
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/3b54885952161aaea4ce2965b2db1638.png',
                        'size': 'medium'
                    },
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/3b54885952161aaea4ce2965b2db1638.png',
                        'size': 'large'
                    },
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/3b54885952161aaea4ce2965b2db1638.png',
                        'size': 'extralarge'
                    }
                ]
            },
            {
                'name': 'The Very Best of Cher',
                'playcount': 1681990,
                'mbid': 'a7e2dad7-e733-4bee-9db1-b31e3183eaf5',
                'url': 'https://www.last.fm/music/Cher/The+Very+Best+of+Cher',
                'artist': {
                    'name': 'Cher',
                    'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                    'url': 'https://www.last.fm/music/Cher'
                },
                'image': [
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/287bc1657795451399d8fadf64555e91.png',
                        'size': 'small'
                    },
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/287bc1657795451399d8fadf64555e91.png',
                        'size': 'medium'
                    },
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/287bc1657795451399d8fadf64555e91.png',
                        'size': 'large'
                    },
                    {
                        '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/287bc1657795451399d8fadf64555e91.png',
                        'size': 'extralarge'
                    }
                ]
            }
        ]
    }
}

var album =
{
    'album': {
        'name': 'Believe',
        'artist': 'Cher',
        'mbid': '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd',
        'url': 'https://www.last.fm/music/Cher/Believe',
        'image': [
            {
                '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/3b54885952161aaea4ce2965b2db1638.png',
                'size': 'small'
            },
            {
                '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/3b54885952161aaea4ce2965b2db1638.png',
                'size': 'medium'
            },
            {
                '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/3b54885952161aaea4ce2965b2db1638.png',
                'size': 'large'
            },
            {
                '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/3b54885952161aaea4ce2965b2db1638.png',
                'size': 'extralarge'
            },
            {
                '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/3b54885952161aaea4ce2965b2db1638.png',
                'size': 'mega'
            },
            {
                '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/3b54885952161aaea4ce2965b2db1638.png',
                'size': ''
            }
        ],
        'listeners': '375479',
        'playcount': '2383069',
        'tracks': {
            'track': [
                {
                    'name': 'Believe',
                    'url': 'https://www.last.fm/music/Cher/_/Believe',
                    'duration': '240',
                    '@attr': {
                        'rank': '1'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'The Power',
                    'url': 'https://www.last.fm/music/Cher/_/The+Power',
                    'duration': '236',
                    '@attr': {
                        'rank': '2'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'Runaway',
                    'url': 'https://www.last.fm/music/Cher/_/Runaway',
                    'duration': '286',
                    '@attr': {
                        'rank': '3'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'All or Nothing',
                    'url': 'https://www.last.fm/music/Cher/_/All+or+Nothing',
                    'duration': '237',
                    '@attr': {
                        'rank': '4'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'Strong Enough',
                    'url': 'https://www.last.fm/music/Cher/_/Strong+Enough',
                    'duration': '224',
                    '@attr': {
                        'rank': '5'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'Dov\'è L\'amore',
                    'url': 'https://www.last.fm/music/Cher/_/Dov%27%C3%A8+L%27amore',
                    'duration': '258',
                    '@attr': {
                        'rank': '6'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'Takin\' Back My Heart',
                    'url': 'https://www.last.fm/music/Cher/_/Takin%27+Back+My+Heart',
                    'duration': '272',
                    '@attr': {
                        'rank': '7'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'Taxi Taxi',
                    'url': 'https://www.last.fm/music/Cher/_/Taxi+Taxi',
                    'duration': '304',
                    '@attr': {
                        'rank': '8'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'Love Is the Groove',
                    'url': 'https://www.last.fm/music/Cher/_/Love+Is+the+Groove',
                    'duration': '271',
                    '@attr': {
                        'rank': '9'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                },
                {
                    'name': 'We All Sleep Alone',
                    'url': 'https://www.last.fm/music/Cher/_/We+All+Sleep+Alone',
                    'duration': '234',
                    '@attr': {
                        'rank': '10'
                    },
                    'streamable': {
                        '#text': '0',
                        'fulltrack': '0'
                    },
                    'artist': {
                        'name': 'Cher',
                        'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
                        'url': 'https://www.last.fm/music/Cher'
                    }
                }
            ]
        },
        'tags': {
            'tag': [
                {
                    'name': 'pop',
                    'url': 'https://www.last.fm/tag/pop'
                },
                {
                    'name': '90s',
                    'url': 'https://www.last.fm/tag/90s'
                },
                {
                    'name': 'dance',
                    'url': 'https://www.last.fm/tag/dance'
                },
                {
                    'name': 'cher',
                    'url': 'https://www.last.fm/tag/cher'
                },
                {
                    'name': 'albums I own',
                    'url': 'https://www.last.fm/tag/albums+I+own'
                }
            ]
        },
        'wiki': {
            'published': '27 Jul 2008, 15:55',
            'summary': 'Believe is the twenty-third studio album by American  singer-actress Cher, released on November 10, 1998 by Warner Bros. Records. The RIAA certified it Quadruple Platinum on December 23, 1999, recognizing four million shipments in the United States; Worldwide, the album has sold more than 20 million copies, making it the biggest-selling album of her career. In 1999 the album received three Grammy Awards nominations including "Record of the Year", "Best Pop Album" and winning "Best Dance Recording" for the single "Believe". <a href="http://www.last.fm/music/Cher/Believe">Read more on Last.fm</a>.',
            'content': 'Believe is the twenty-third studio album by American  singer-actress Cher, released on November 10, 1998 by Warner Bros. Records. The RIAA certified it Quadruple Platinum on December 23, 1999, recognizing four million shipments in the United States; Worldwide, the album has sold more than 20 million copies, making it the biggest-selling album of her career. In 1999 the album received three Grammy Awards nominations including "Record of the Year", "Best Pop Album" and winning "Best Dance Recording" for the single "Believe".\n\nIt was released by Warner Bros. Records at the end of 1998. The album was executive produced by Rob Dickens. Upon its debut, critical reception was generally positive. Believe became Cher\'s most commercially-successful release, reached number one and Top 10 all over the world. In the United States, the album was released on November 10, 1998, and reached number four on the Billboard 200 chart, where it was certified four times platinum.\n\nThe album featured a change in Cher\'s music; in addition, Believe presented a vocally stronger Cher and a massive use of vocoder and Auto-Tune. In 1999, the album received 3 Grammy Awards nominations for "Record of the Year", "Best Pop Album" and winning "Best Dance Recording". Throughout 1999 and into 2000 Cher was nominated and winning many awards for the album including a Billboard Music Award for "Female Vocalist of the Year", Lifelong Contribution Awards and a Star on the Walk of Fame shared with former Sonny Bono. The boost in Cher\'s popularity led to a very successful Do You Believe? Tour.\n\nThe album was dedicated to Sonny Bono, Cher\'s former husband who died earlier that year from a skiing accident.\n\nCher also recorded a cover version of "Love Is in the Air" during early sessions for this album. Although never officially released, the song has leaked on file sharing networks.\n\nSingles\n\n\n"Believe"\n"Strong Enough"\n"All or Nothing"\n"Dov\'è L\'Amore" <a href="http://www.last.fm/music/Cher/Believe">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.'
        }
    }
}
var tracks =
{
   
    'track': {
        'name': 'Believe',
        'mbid': '32ca187e-ee25-4f18-b7d0-3b6713f24635',
        'url': 'https://www.last.fm/music/Cher/_/Believe',
        'duration': '240000',
        'streamable': {
            '#text': '0',
            'fulltrack': '0'
        },
        'listeners': '466945',
        'playcount': '2250794',
        'artist': {
            'name': 'Cher',
            'mbid': 'bfcc6d75-a6a5-4bc6-8282-47aec8531818',
            'url': 'https://www.last.fm/music/Cher'
        },
        'album': {
            'artist': 'Cher',
            'title': 'Believe',
            'mbid': '63b3a8ca-26f2-4e2b-b867-647a6ec2bebd',
            'url': 'https://www.last.fm/music/Cher/Believe',
            'image': [
                {
                    '#text': 'https://lastfm-img2.akamaized.net/i/u/34s/3b54885952161aaea4ce2965b2db1638.png',
                    'size': 'small'
                },
                {
                    '#text': 'https://lastfm-img2.akamaized.net/i/u/64s/3b54885952161aaea4ce2965b2db1638.png',
                    'size': 'medium'
                },
                {
                    '#text': 'https://lastfm-img2.akamaized.net/i/u/174s/3b54885952161aaea4ce2965b2db1638.png',
                    'size': 'large'
                },
                {
                    '#text': 'https://lastfm-img2.akamaized.net/i/u/300x300/3b54885952161aaea4ce2965b2db1638.png',
                    'size': 'extralarge'
                }
            ],
            '@attr': {
                'position': '1'
            }
        },
        'toptags': {
            'tag': [
                {
                    'name': 'pop',
                    'url': 'https://www.last.fm/tag/pop'
                },
                {
                    'name': 'dance',
                    'url': 'https://www.last.fm/tag/dance'
                },
                {
                    'name': '90s',
                    'url': 'https://www.last.fm/tag/90s'
                },
                {
                    'name': 'cher',
                    'url': 'https://www.last.fm/tag/cher'
                },
                {
                    'name': 'female vocalists',
                    'url': 'https://www.last.fm/tag/female+vocalists'
                }
            ]
        },
        'wiki': {
            'published': '27 Jul 2008, 15:44',
            'summary': '"Believe" is a Grammy Award winning global number one, Multi-Platinum Dance Song which served as the world-wide lead single for American singer Cher\'s twenty-third studio album Believe. It is noted for its use of a peculiar sound effect on the singer\'s vocals, which is referred to as the Cher effect today.\n\n"Believe" was written by a number of writers including Paul Barry, Matt Gray, Brian Higgins, Stuart McLellan, Timothy Powell, and Steven Torch. <a href="http://www.last.fm/music/Cher/_/Believe">Read more on Last.fm</a>.',
            'content': '"Believe" is a Grammy Award winning global number one, Multi-Platinum Dance Song which served as the world-wide lead single for American singer Cher\'s twenty-third studio album Believe. It is noted for its use of a peculiar sound effect on the singer\'s vocals, which is referred to as the Cher effect today.\n\n"Believe" was written by a number of writers including Paul Barry, Matt Gray, Brian Higgins, Stuart McLellan, Timothy Powell, and Steven Torch. The song, released and recorded in 1998, peaked at number one in 23 countries worldwide .In the second week of March, 1999, it reached number one in the Billboard Hot 100, making Cher the oldest female artist (at the age of 52) to perform this feat. It also was ranked as the number-one song of 1999 by Billboard, and became the biggest single in her entire career. "Believe" also spent seven weeks at number one] in the UK singles chart and is still the best selling single by a female artist in the UK. \n\n\nIn March 2007, the United World Chart ranked "Believe" as the sixteenth most successful song in music history. The same chart lists "Believe" as third most successful song released by a solo female musician behind Whitney Houston\'s "I Will Always Love You" and Celine Dion\'s My Heart Will Go On; [5], the biggest selling single ever for Warner Bros. Records and the biggest selling dance song ever having sold over 10 million copies worldwide. It was also the song with most weeks in the top ten, it stayed in the top ten for 28 weeks.\n\nThe success of the song not only expanded through each country\'s singles chart, but also most country\'s dance charts. In the United States "Believe" spent 23 weeks on the U.S. Hot Dance Club Play chart and 22 weeks on the European Hot Dance Charts. "Believe" also set a record in 1999 after spending 21 weeks in the top spot of the Billboard Hot Dance Singles Sales chart, it was still in the top ten even one year after its entry on the chart. \n\n"Believe" was given the featured closing number spot for over 100 performances on Cher\'s 1999-2000 Do You Believe? Tour and then again the closing spot for over 300 performances on Cher\'s epic 2002-2005 Living Proof: The Farewell Tour. The song ranked #74 on VH1\'s 100 Greatest Songs of the 90s.\n\nAn interesting note about the recording of the song revolved around the highly-recognizable Auto-tune effect ("Cher effect") utilized in the verses and chorus. Producer Mark Taylor added the effect to Cher\'s vocal simply as a lark, and in interviews at the time, he claimed to be testing out his recently purchased the \'DigiTech Talker\'. However, it later emerged that the effect was not created by a vocoder, but by utilizing extreme (and then unheard) settings on auto-tune.When Cher heard the results, she demanded that the effect remain in the song, and her original vocal be erased, much to the chagrin of her record company, who wanted it removed; upon their suggestion, Cher\'s response to the record label was "over my dead body!"[citation needed] The vocal effect is caused by a pitch correction speed that is "set too fast for the audio that it is processing." \n\n\nU.S. Billboard Hot 100 Airplay\t1\nU.S. Billboard Hot 100\t1\nU.S. Billboard Hot Dance Club Play\t1\nU.S. Billboard Hot Dance Singles Sales\t1\nU.S. Billboard Hot Adult Contemporary Tracks\t2\nU.S. Billboard Hot Adult Top 40 Tracks\t2\nU.S. Billboard Top 40 Mainstream\t2\nArgentinian Singles Chart\t2\nAustralian ARIA Singles Chart\t1\nAustrian Singles Chart\t2\nBelgian Singles Chart\t1\nBrazilian Airplay Chart\t1\nCroatian Singles Chart\t1\nCanadian Singles Chart\t1\nDanish Singles Chart\t1\nDutch Mega Top 50 Singles Chart\t1\nDutch Top 40\t1\nEuropean Singles Chart\t1\nFinnish Singles Chart\t6\nFrench Singles Chart\t1\nGerman Singles Chart\t1\nIrish Singles Chart\t1\nIsraeli Singles Chart\t1\nItalian Singles Chart\t1\nLatvian Singles Chart\t1\nMexican Singles Chart\t1\nNew Zealand\'s Singles Chart\t1\nNorwegian Singles Chart\t1\nPolish Singles Chart\t1\nSpanish Singles Chart\t1\nSwedish Singles Chart\t1\nSwedish Airplay Chart\t1\nSwiss Singles Chart\t1\nUK Singles Chart\t1\nUnited World Chart\t1\n <a href="http://www.last.fm/music/Cher/_/Believe">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.'
        }
    }
}



class lastfm{

    static getArtists(query){
        if(query && query.artist==='Cher') return Promise.resolve(artists)
        return Promise.reject({code:400, message:'Name is not Cher'})
    }

    static getArtistTopAlbums(arId, query){
        if(arId==='bfcc6d75-a6a5-4bc6-8282-47aec8531818' || (query && query.artist==='Cher')) return Promise.resolve(albums)
        return Promise.reject({code:400, message:'Incorrect ID or name'})
    }

    static getAlbum(alId){
        if(alId==='63b3a8ca-26f2-4e2b-b867-647a6ec2bebd') return Promise.resolve(album)
        return Promise.reject({code:400, message:'Incorrect ID '})
    }

    static getTrack(body){
        if(body.name === tracks.track.name) return Promise.resolve(tracks)
        return Promise.reject({code:400, message:'Incorrect trackname'})
    }



}
module.exports = lastfm