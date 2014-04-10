
formuls = {
    "formuls": {
        "%": "return eval(p.a+p.c+(p.a/100*p.b))",
        "the": "return al.calc.items[0]!=undefined&&al.calc.items[0].attr('slot')==35?p:0",
        "de": "return al.calc.items[0]!=undefined&&al.calc.items[0].attr('slot')==36?p:0",
        "ke": "return al.calc.items[0]!=undefined&&al.calc.items[0].attr('class_')==13?p:0",
        "sse": "return al.calc.items[0]!=undefined&&al.inArray(al.calc.items[0].attr('class_'),[5,12,16])?p:0",
        "rune": "p+='';<br/>if(p.length<2)p='0'+p;<br/>var result=0;<br/>switch(p){<br/>case '01':result=3.33;break;<br/>case '02':result=6.66;break;<br/>case '03':result=10;break;<br/>case '04':result=13.33;break;<br/>case '05':result=16.66;break;<br/>case '06':result=20;break;<br/>case '07':result=23.33;break;<br/>case '08':result=26.66;break;<br/>case '09':result=30;break;<br/>case '10':result=33.33;break;<br/>case '11':result=36.66;break;<br/>case '12':result=40;break;<br/>case '13':result=43.33;break;<br/>case '14':result=46.66;break;<br/>case '15':result=50;break;<br/>case '16':result=53.33;break;<br/>case '17':result=56.66;break;<br/>case '18':result=60;break;<br/>case '19':result=63.33;break;<br/>case '20':result=66.66;bre6k;<br/>case '21':result=70;break;<br/>case '22':result=73.33;break;<br/>case '23':result=76.66;break;<br/>case '24':result=80;break;<br/>case '25':result=83.33;break;<br/>case '26':result=86.66;break;<br/>case '27':result=90;break;<br/>case '28':result=93.33;break;<br/>case '29':result=96.66;break;<br/>case '30':result=100;break;<br/>}<br/>return result;",
        "md": "return p.a*(al.calc.items[1]==undefined?1:al.calc.items[1].attr('spell_power'))*al.calc.stats.i.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "m": "return Math.round(p.a*Math.exp((al.calc.currentLvl()-1)/15.264))",
        "minusLimit": "var a=p.a-p.b;return a<p.c?p.c:a",
        "bmd": "return p.a*(al.calc.items[1]==undefined?1:al.calc.items[1].attr('spell_power'))*al.calc.stats.s.value()*0.16*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "fdmin": "return p.a*(al.calc.items[0]==undefined?1:al.calc.items[0].attr('min_damage'))*al.calc.stats.s.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "fdmax": "return p.a*(al.calc.items[0]==undefined?1:al.calc.items[0].attr('max_damage'))*al.calc.stats.s.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "dfdmin": "return p.a*(al.calc.items[0]==undefined?1:al.calc.items[0].attr('min_damage'))*al.calc.stats.i.value()*0.0766666681*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "dfdmax": "return p.a*(al.calc.items[0]==undefined?1:al.calc.items[0].attr('max_damage'))*al.calc.stats.i.value()*0.0766666681*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "round": "return Math.round(p.a)",
        "timeTT": "return al.timeToText(p.a<1?1:p.a)",
        "priestAspectLvl3": "return al.calc.talents.Master_Aspektov.attr('lvl')>2?p:0",
        "rdmin": "return p.a*((al.calc.items[1]==undefined?1:al.calc.items[1].attr('min_damage'))+(al.calc.items[3]==undefined?0:al.calc.items[3].attr('min_damage')))*al.calc.stats.s.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "rdmax": "return p.a*((al.calc.items[1]==undefined?1:al.calc.items[1].attr('max_damage'))+(al.calc.items[3]==undefined?0:al.calc.items[3].attr('max_damage')))*al.calc.stats.s.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "mdNoRune": "return p.a*((al.calc.items[1]==undefined?1:al.calc.items[1].attr('spell_power'))+(al.calc.items[3]==undefined?0:al.calc.items[3].attr('spell_power')))*al.calc.stats.i.get()*(al.calc.stats.f.get()+100)/100",
        "dpet": "return p.a*al.calc.stats.i.value()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100*Math.pow(1.0577,al.calc.currentLvl()-1)",
        "noShield": "return al.calc.items[0]!=undefined&&al.calc.items[0].attr('class_')!=9?p:0",
        "c": "return p.a*(al.calc.items[0]!=undefined?al.calc.items[0].attr('weapon_speed'):1)",
        "mma": "return al.calc.formuls.m.exec(p)*(al.calc.items[0]!=undefined?al.calc.items[0].attr('weapon_speed')/2:1)",
        "cr": "return p.a*(al.calc.items[1]!=undefined?al.calc.items[1].attr('weapon_speed'):1)",
        "e": "return p.a*(al.calc.items[0]!=undefined?al.calc.items[0].attr('weapon_speed')/2:1)",
        "er": "return p.a*(al.calc.items[1]!=undefined?al.calc.items[1].attr('weapon_speed')/2:1)",
        "sdmin": "var a=((al.calc.items[1]==undefined?0:al.calc.items[1].attr('armor'))+(al.calc.items[3]==undefined?0:al.calc.items[3].attr('armor')))*0.9;<br/>return p.a*(a>0?a:1)*al.calc.stats.s.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "sdmax": "var a=((al.calc.items[1]==undefined?0:al.calc.items[1].attr('armor'))+(al.calc.items[3]==undefined?0:al.calc.items[3].attr('armor')))*1.1;<br/>return p.a*(a>0?a:1)*al.calc.stats.s.get()*(al.calc.stats.f.get()+100)/100*(al.calc.stats.r.get()+100)/100",
        "priestAspectLvl2": "return al.calc.talents.Master_Aspektov.attr('lvl')>1?p:0",
        "priestAspectLvl1": "return al.calc.talents.Master_Aspektov.attr('lvl')>0?p:0",
        "tearsC": "return p.a*(1-0.17-0.085*(al.calc.stats.t.get()-1))"
    },
    "desc": {
        "lvl": "return '<div class=\\\"talent_lvl\\\">Current rank: '+p+'</div>'",
        "nextLvl": "return '<div class=\\\"talent_lvl\\\">Next rank: '+p+'</div>'",
        "cost": "return '<div class=\\\"talent_cost'+(p.r?'':' no')+'\\\">Cost: '+p.cost+' '+(p.mosaic.z==0?(p.cost==1?'talent':'talents'):'ruby')+'</div>'",
        "element": "return '<div class=\\\"talent_element\\\">Element: '+p+'</div>'",
        "range": "return '<div class=\\\"talent_range\\\">Range: '+p+'</div>'",
        "mana": "return '<div class=\\\"talent_mana\\\">Mana: '+(p==0?'Not needed':Math.round(p))+'</div>'",
        "energy": "return '<div class=\\\"talent_mana\\\">Energy: '+(p==0?'Not needed':Math.round(p))+'</div>'",
        "time": "p=al.calc.eval(p);p=isNaN(p)||p<=0?'Instant':al.timeToText(p);return '<div class=\\\"talent_time\\\">Cast time: '+p+'</div>'",
        "cooldown": "p=al.calc.eval(p);p=isNaN(p)||p<=0?'Instant':al.timeToText(p);return '<div class=\\\"talent_cooldown\\\">Cooldown: '+p+'</div>'",
        "preparation": "return '<div class=\\\"talent_preparation\\\">Can be prepared</div>'",
        "channeling": "return '<div class=\\\"talent_time\\\">Cast time: '+(p==0?'Instant':al.timeToText(p))+'</div>'",
        "radius": "return '<div class=\\\"talent_range\\\">Range: '+al.t('{n} m|m|m',p)+'</div>'",
        "do": "return '<div class=\\\"talent_link lvl_0 clearfix\\\"><img src=\\\"'+al.staticPath+'themes/armory'+al.calc.modifiers[p.a.modifier].ico+'\\\"/><span><b>'+al.calc.modifiers[p.a.modifier].title+'</b><p>'+($.inArray(/#([a-z]+)/.exec(document.location)[1],['w','t','s','b'])>-1?'Dragon relics of this group increase <g>Strength</g> for this skill.':'Dragon relics of this group increase <g>Intelligence</g> for this skill.')+'</p></span></div>'"
    },
    "stats": {
        "s": {
            "name": "s",
            "title": "Strength",
            "body": "return p.value*0.0766666681",
            "default1": "100",
            "default2": "0"
        },
        "i": {
            "name": "i",
            "title": "Intelligence",
            "body": "return p.value/18.75",
            "default1": "100",
            "default2": "100"
        },
        "r": {
            "name": "r",
            "title": "Runes",
            "body": "var result=0;for(var i=0;i<p.value.length;i+=2)result+=al.calc.formuls.rune.exec(p.value.substr(i,2));return result;",
            "default1": "060606",
            "default2": "060606"
        },
        "f": {
            "name": "f",
            "title": "Patron",
            "body": "return p.value*50",
            "default1": "4",
            "default2": "4"
        },
        "t": {
            "name": "t",
            "title": "Dragon tears",
            "body": "return p.value",
            "default1": "1",
            "default2": "1"
        }
    },
    "modifiers": {
        "1": {
            "id": "1",
            "name": "Dragon Trick",
            "title": "Dragon Trick",
            "ico": "/images/Interface/Icons/Spells/DragonTrick.(UITexture).png"
        },
        "2": {
            "id": "2",
            "name": "Dragon Malice",
            "title": "Dragon Malice",
            "ico": "/images/Interface/Icons/Spells/DragonMalice.(UITexture).png"
        },
        "3": {
            "id": "3",
            "name": "Dragon Courage",
            "title": "Dragon Courage",
            "ico": "/images/Interface/Icons/Spells/DragonCourage.(UITexture).png"
        },
        "4": {
            "id": "4",
            "name": "Dragon Grace",
            "title": "Dragon Grace",
            "ico": "/images/Interface/Icons/Spells/DragonGrace.(UITexture).png"
        },
        "5": {
            "id": "5",
            "name": "Dragon Power",
            "title": "Dragon Power",
            "ico": "/images/Interface/Icons/Spells/DragonPower.(UITexture).png"
        },
        "6": {
            "id": "6",
            "name": "Dragon Hatred",
            "title": "Dragon Hatred",
            "ico": "/images/Interface/Icons/Spells/DragonHatred.(UITexture).png"
        },
        "7": {
            "id": "7",
            "name": "Dragon Valor",
            "title": "Dragon Valor",
            "ico": "/images/Interface/Icons/Spells/DragonValor.(UITexture).png"
        },
        "8": {
            "id": "8",
            "name": "Dragon Noble",
            "title": "Dragon Noble",
            "ico": "/images/Interface/Icons/Spells/DragonNoble.(UITexture).png"
        },
        "9": {
            "id": "9",
            "name": "Dragon Durability",
            "title": "Dragon Durability",
            "ico": "/images/Interface/Icons/Spells/DragonDurability.(UITexture).png"
        }
    }
};
