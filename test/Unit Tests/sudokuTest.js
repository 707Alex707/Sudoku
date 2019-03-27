const chai = require('chai');
const sudoku = require('../sudoku1.js');

// Test for function scanx()
it('scanx(y) puzzle not initialized', function() {
	try  {
		sudoku.scanx(3);
	}
	catch (err) {
		chai.expect(err).to.be.an.instanceof(TypeError);
	}
});

// Test for function scany()
it('scany(x) puzzle not initialized', function() {
	try  {
		sudoku.scany(3);
	}
	catch (err) {
		chai.expect(err).to.be.an.instanceof(TypeError);
	}
});

// Tests for ranInt()
it('ranInt() input is positive number', function() {
	x1 = sudoku.ranInt(5);
	x2 = sudoku.ranInt(5);
	chai.assert(x1 != x2);	// check that both are different
});

it('ranInt() input is negative number', function() {
	x1 = sudoku.ranInt(-10);
	x2 = sudoku.ranInt(-10);
	chai.assert(x1 != x2);	// check that both are different
});

it('ranInt() input is 0', function() {
	x1 = sudoku.ranInt(0);
	x2 = sudoku.ranInt(0);
	chai.assert(x1 = x2);	// check that both are different
});

it('ranInt() input is null', function() {
	try  {
		sudoku.ranInt(null);
	}
	catch (err) {
		chai.expect(err).to.be.an.instanceof(TypeError);
	}
});

// Tests for removecommon()
it('removecommon() input is null', function() {
	try  {
		sudoku.removecommon(null,null);
	}
	catch (err) {
		chai.expect(err).to.be.an.instanceof(TypeError);
	}
});

it('removecommon() with common elements', function() {
	array1 = [1,2,3,4,5,6];
	temp = [1,2,3,4];
	result = sudoku.removecommon(array1,temp);
	chai.assert.equal(2, result.length);
	chai.assert.equal(5, result[0]);
	chai.assert.equal(6, result[1]);
});

it('removecommon() with no common elements', function() {
	array1 = [1,2,3,4,5];
	temp = [7,6,8];
	result = sudoku.removecommon(array1,temp);
	chai.assert.equal(5, result.length);
	chai.assert.equal(1, result[0]);
	chai.assert.equal(2, result[1]);
	chai.assert.equal(3, result[2]);
	chai.assert.equal(4, result[3]);
	chai.assert.equal(5, result[4]);
});
