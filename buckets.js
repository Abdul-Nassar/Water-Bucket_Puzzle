var queue = [];
var seen = {};
var final;
function getstate()
{
        if(queue == undefined)
                return;
        state = queue[0];
        queue = queue.slice(1);
        return state;
}

function addstate(parentstate, newstate)
{
        if(String(newstate) in seen)
                return;
        seen[String(newstate)] = String(parentstate);
	queue.push(newstate);
}

function test(oldstate, newstate)
{
        var newA = newstate[0];
        var newB = newstate[1];
        won = (newA == final || newB == final);
        addstate(oldstate, newstate);
        return won;
}

function getsolution()
{
	var solution = [];
	state = (queue.slice(-1));
	while(state)
	{
		solution.push(String(state));
		state = getparent(state);
	}
	solution.reverse();
	return solution;
}

function getparent(childstate)
{
	try
	{
		return seen[String(childstate)];
	}
	catch(e)
	{
		return undefined;	
	}
}


function playGame(aMax, bMax, goal)
{
	final = goal;
	addstate("", [0,0]);	//start with 2 empty buckets
	while(true)
	{
		oldstate = getstate();
		var aHas = oldstate[0];
		var bHas = oldstate[1];
		if(test(oldstate, [aMax, bHas]))	//Fill A from well
			break;
		if(test(oldstate, [0, bHas]))		//Empty A 
			break;
		if(test(oldstate, [aHas, bMax]))	//Fill B from well
			break;
		if(test(oldstate, [aHas, 0]))		//Empty B
			break;
		howmuch = Math.min(aHas, bMax-bHas);
		if(test(oldstate, [aHas-howmuch, bHas+howmuch]))	//Pour A to B
			break;
		howmuch = Math.min(bHas, aMax-aHas);
		if(test(oldstate, [aHas+howmuch, bHas-howmuch]))	//Pour B to A
			break;
	}
	console.log("Solution Is :");
	console.log(getsolution());
}
	
playGame(7, 11, 6);
